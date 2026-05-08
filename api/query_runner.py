"""
BondBox API — Query Runner

Loads SQL files from api/queries/, handles @param substitution,
and executes queries read-only against SQL Server.
"""

import re
import os
from pathlib import Path
from typing import Any

from .db import get_connection, get_financial_entry_connection

QUERIES_DIR = Path(__file__).parent / "queries"


def load_sql(filename: str) -> str:
    """Load a .sql file from the queries directory."""
    filepath = QUERIES_DIR / filename
    if not filepath.exists():
        raise FileNotFoundError(f"Query file not found: {filepath}")
    return filepath.read_text(encoding="utf-8")


def _find_params(sql: str) -> list[str]:
    """
    Find all @ParamName references in the SQL text.
    Returns unique param names in order of first appearance.
    """
    # Match @word but not @@system_variables
    matches = re.findall(r'(?<!@)@([A-Za-z_]\w*)', sql)
    seen = set()
    ordered = []
    for m in matches:
        if m not in seen:
            seen.add(m)
            ordered.append(m)
    return ordered


def _substitute_params(sql: str, params: dict[str, Any]) -> tuple[str, list[Any]]:
    """
    Replace @ParamName with ? placeholders for pyodbc.
    Handles multi-value IN (@param) by expanding to IN (?, ?, ...).
    
    Returns (modified_sql, ordered_values_list).
    """
    values = []
    
    # Find all @param usages and replace them
    # Process IN (...@param...) patterns first for multi-value expansion
    def replace_in_param(match):
        param_name = match.group(1)
        val = params.get(param_name)
        if val is None:
            values.append(None)
            return "?"
        # If it's a list or comma-separated string, expand
        if isinstance(val, str) and "," in val:
            items = [v.strip() for v in val.split(",")]
        elif isinstance(val, (list, tuple)):
            items = list(val)
        else:
            values.append(val)
            return "?"
        placeholders = ", ".join(["?"] * len(items))
        values.extend(items)
        return placeholders

    # Replace IN (@param) patterns — handles "IN (@param)" and "in (@param)"
    sql = re.sub(
        r'[Ii][Nn]\s*\(\s*@([A-Za-z_]\w*)\s*\)',
        lambda m: f"IN ({replace_in_param(m)})",
        sql
    )
    
    # Replace remaining @param references with ?
    def replace_single_param(match):
        param_name = match.group(1)
        val = params.get(param_name)
        values.append(val)
        return "?"
    
    sql = re.sub(r'(?<!@)@([A-Za-z_]\w*)', replace_single_param, sql)
    
    return sql, values


def execute_query(filename: str, params: dict[str, Any] | None = None) -> list[dict]:
    """
    Load and execute a SQL file with optional parameters.
    Returns results as a list of dicts (column_name: value).
    """
    sql = load_sql(filename)
    
    # Prepend SET NOCOUNT ON for multi-statement queries (temp tables, etc.)
    sql = "SET NOCOUNT ON;\n" + sql
    
    # Remove any DROP TABLE statements (cleanup from RDL extraction)
    sql = re.sub(r'(?i)\bdrop\s+table\s+#\w+', '', sql)
    
    # Strip all single-line comments (-- ...) to avoid matching @params in comments
    sql = re.sub(r'--.*$', '', sql, flags=re.MULTILINE)
    
    if params:
        sql, values = _substitute_params(sql, params)
    else:
        values = []
    
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        
        # For multi-statement queries (temp tables), we need the LAST result set.
        # Collect results from the final result set that has data.
        columns = None
        rows = None
        
        # Check if current result set has data
        if cursor.description:
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()
        
        # Advance through any additional result sets (temp table queries)
        while cursor.nextset():
            if cursor.description:
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()
        
        if not columns or rows is None:
            return []
        
        return [dict(zip(columns, row)) for row in rows]


def execute_raw_sql(sql: str, params: dict[str, Any] | None = None) -> list[dict]:
    """
    Execute raw SQL (not from a file) with optional parameters.
    Used for simple inline queries like account lists.
    """
    sql = "SET NOCOUNT ON;\n" + sql
    
    if params:
        sql, values = _substitute_params(sql, params)
    else:
        values = []
    
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        
        columns = None
        rows = None
        
        if cursor.description:
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()
        
        while cursor.nextset():
            if cursor.description:
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()
        
        if not columns or rows is None:
            return []
        
        return [dict(zip(columns, row)) for row in rows]


def execute_query_fe(filename: str, params: dict[str, Any] | None = None) -> list[dict]:
    """
    Load and execute a SQL file against the Bonds_Financial_Entry database.
    Used for WIP queries that only exist on the secondary server.
    """
    sql = load_sql(filename)
    sql = "SET NOCOUNT ON;\n" + sql
    sql = re.sub(r'(?i)\bdrop\s+table\s+#\w+', '', sql)
    sql = re.sub(r'--.*$', '', sql, flags=re.MULTILINE)
    
    if params:
        sql, values = _substitute_params(sql, params)
    else:
        values = []
    
    with get_financial_entry_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        
        columns = None
        rows = None
        
        if cursor.description:
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()
        
        while cursor.nextset():
            if cursor.description:
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()
        
        if not columns or rows is None:
            return []
        
        return [dict(zip(columns, row)) for row in rows]
