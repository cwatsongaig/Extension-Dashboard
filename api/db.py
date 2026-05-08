"""
BondBox API — Database Connection

Read-only connection to SQL Server using Windows Integrated Authentication.
Uses READ UNCOMMITTED isolation (same as NOLOCK hints in the original reports).
"""

import pyodbc
from contextlib import contextmanager
from .config import get_connection_config, get_financial_entry_config


def _build_connection_string() -> str:
    cfg = get_connection_config()
    conn_str = (
        f"Driver={{ODBC Driver 17 for SQL Server}};"
        f"Server={cfg['server']};"
        f"Database={cfg['database']};"
        f"Trusted_Connection=yes;"
        f"TrustServerCertificate=yes;"
    )
    # Only use ApplicationIntent=ReadOnly if the environment supports it
    if cfg.get('read_only_intent', False):
        conn_str += "ApplicationIntent=ReadOnly;"
    return conn_str


@contextmanager
def get_connection():
    """
    Yields a pyodbc connection set to READ UNCOMMITTED.
    Automatically closes when done.
    """
    conn = pyodbc.connect(_build_connection_string(), autocommit=True)
    try:
        cursor = conn.cursor()
        cursor.execute("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED")
        cursor.close()
        yield conn
    finally:
        conn.close()


@contextmanager
def get_financial_entry_connection():
    """
    Yields a pyodbc connection to Bonds_Financial_Entry (WIP data).
    Different server from the primary DataInterface connection.
    """
    cfg = get_financial_entry_config()
    conn_str = (
        f"Driver={{ODBC Driver 17 for SQL Server}};"
        f"Server={cfg['server']};"
        f"Database={cfg['database']};"
        f"Trusted_Connection=yes;"
        f"TrustServerCertificate=yes;"
    )
    conn = pyodbc.connect(conn_str, autocommit=True)
    try:
        cursor = conn.cursor()
        cursor.execute("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED")
        cursor.close()
        yield conn
    finally:
        conn.close()
