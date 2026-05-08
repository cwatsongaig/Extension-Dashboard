"""
BondBox API — FastAPI Application

Read-only data API for the BondBox prototype dashboard.
Pulls live data from SQL Server (BondBox_DataInterface) using Windows Auth.

Run with:
    cd "C:\\Development\\New Extension Build"
    python -m uvicorn api.main:app --reload --port 8000

Then open http://localhost:8000 in your browser.
"""

import os
from pathlib import Path
from datetime import date, timedelta
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .config import get_current_env, set_current_env, get_connection_config, ENVIRONMENTS
from .query_runner import execute_query, execute_raw_sql, execute_query_fe

# Directory containing the frontend files (parent of the api/ package)
FRONTEND_DIR = Path(__file__).resolve().parent.parent

app = FastAPI(
    title="BondBox Dashboard API",
    description="Read-only API for BondBox prototype — pulls live data from SQL Server",
    version="0.1.0",
)

# CORS — allow local development origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permissive for local prototype
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ========== Environment Endpoints ==========

class EnvSwitch(BaseModel):
    env: str


@app.get("/api/env")
def get_env():
    """Returns the current active environment (cert/prod)."""
    env = get_current_env()
    cfg = get_connection_config()
    return {
        "environment": env,
        "label": cfg["label"],
        "server": cfg["server"],
        "database": cfg["database"],
    }


@app.post("/api/env")
def switch_env(body: EnvSwitch):
    """Switch between cert and prod environments."""
    try:
        set_current_env(body.env)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return get_env()


# ========== Reference Data ==========

@app.get("/api/branches")
def get_branches(region: str = Query(None, description="Filter: 'Contract' or 'Commercial'")):
    """Returns all active branches, optionally filtered by region type."""
    rows = execute_query("branches.sql")
    if region:
        region_lower = region.lower()
        rows = [r for r in rows if r.get("BranchType", "").lower() == region_lower]
    return rows


@app.get("/api/user-branches")
def get_user_branches(username: str = Query(..., description="Username to look up branch access for")):
    """Returns the list of branches a user has access to from UserBranches table."""
    return _safe_query("user_branches.sql", {"Username": username})


@app.get("/api/accounts")
def get_accounts(
    type: str = Query(None, description="Filter: 'Contract', 'Commercial', or omit for all"),
    branch: str = Query(None, description="Branch ID to filter by"),
):
    """Returns all active/suspended accounts for the account dropdown."""
    rows = execute_query("accounts.sql")
    if type:
        type_lower = type.lower()
        rows = [r for r in rows if r.get("AccountType", "").lower() == type_lower]
    if branch:
        rows = [r for r in rows if str(r.get("BranchId", "")) == branch]
    return rows


# ========== Dashboard Data Endpoints ==========
# All data endpoints catch DB errors and return empty arrays gracefully
# so the dashboard can fall back to static data for any query that fails.


def _safe_query(filename: str, params=None):
    """Execute a query, returning empty list + error info on failure."""
    try:
        return execute_query(filename, params)
    except Exception as e:
        print(f"[QUERY ERROR] {filename}: {e}")
        return JSONResponse(
            content={"data": [], "error": str(e), "query": filename},
            status_code=200,  # Return 200 so frontend doesn't throw
        )

@app.get("/api/data/arr")
def get_arr(
    branch: str = Query(..., description="Branch ID(s), comma-separated for multiple"),
):
    """
    Account Review Ratings — populates sampleARRs.
    Returns most recent ARR per account for the given branch(es).
    """
    return _safe_query("arr.sql", {"Branch": branch})


@app.get("/api/data/bonds")
def get_bonds(
    startDate: str = Query(None, description="Start date (YYYY-MM-DD). Default: 6 months ago"),
    endDate: str = Query(None, description="End date (YYYY-MM-DD). Default: today"),
):
    """
    All Bonds — populates sampleBonds.
    Returns bonds created within the date range.
    """
    if not endDate:
        endDate = date.today().isoformat()
    if not startDate:
        startDate = (date.today() - timedelta(days=180)).isoformat()
    return _safe_query("bonds.sql", {"StartDate": startDate, "EndDate": endDate})


@app.get("/api/data/loa")
def get_loa(
    status: str = Query("Active/Approved", description="LOA status filter (e.g., 'Active/Approved', 'Pending', 'Expired')"),
):
    """
    Line of Authority — populates sampleLOAData.
    Returns LOAs filtered by status.
    """
    return _safe_query("loa.sql", {"Status": status})


@app.get("/api/data/red-flags")
def get_red_flags(
    branch: str = Query(..., description="Branch code(s), comma-separated"),
):
    """
    Red Flag Audit — populates sampleRedFlagData.
    Returns red flag counts per account for the given branch code(s).
    """
    return _safe_query("red_flags.sql", {"branch": branch})


@app.get("/api/data/financials")
def get_financials(
    branch: str = Query(..., description="Branch ID(s), comma-separated"),
):
    """
    Financial Statement Timeliness — populates sampleFinancials.
    """
    return _safe_query("financials.sql", {"Branch": branch})


@app.get("/api/data/agencies")
def get_agencies(
    branch: str = Query(..., description="Branch ID(s), comma-separated"),
):
    """
    Active Agencies — populates samplePremiumAR / agency views.
    """
    return _safe_query("agencies.sql", {"Branch": branch})


@app.get("/api/data/service")
def get_service_activity(
    branch: str = Query(..., description="Branch code(s), comma-separated"),
    year: int = Query(None, description="Year (default: current year)"),
):
    """
    Service & Activity Report — populates sampleServiceActivity.
    """
    if not year:
        year = date.today().year
    return _safe_query("service.sql", {"Branch": branch, "Year": year})


@app.get("/api/data/bid-log")
def get_bid_log(
    accountId: str = Query(..., description="BondBox Account ID"),
):
    """
    Bid Log — populates sampleBidLog for a specific account.
    """
    return _safe_query("bid_log.sql", {"AccountId": accountId})


@app.get("/api/data/bid-log-branch")
def get_bid_log_branch(
    branch: str = Query(..., description="Branch ID(s), comma-separated"),
):
    """
    Bid Log by Branch — populates sampleBidLog on dashboard load.
    Returns recent bid log entries for accounts in the given branch(es).
    """
    return _safe_query("bid_log_branch.sql", {"Branch": branch})


@app.get("/api/data/claims")
def get_claims(
    branch: str = Query("", description="Branch ID(s), comma-separated. Empty = all branches."),
):
    """
    Claims — populates sampleClaims.
    Returns claims for accounts in the given branch(es), or all if branch is empty.
    """
    if not branch or branch.strip() == "":
        return _safe_query("claims_all.sql")
    return _safe_query("claims.sql", {"Branch": branch})


@app.get("/api/data/wip")
def get_wip(
    accountId: str = Query(..., description="BondBox Account ID(s), comma-separated"),
):
    """
    WIP (Status of Contracts) — populates sampleWIPJobs.
    Queries the Bonds_Financial_Entry database on a secondary server.
    """
    try:
        return execute_query_fe("wip_branch.sql", {"AccountIds": accountId})
    except Exception as e:
        print(f"[QUERY ERROR] wip_branch.sql: {e}")
        return JSONResponse(
            content={"data": [], "error": str(e), "query": "wip_branch.sql"},
            status_code=200,
        )


# ========== Health Check ==========

@app.get("/api/health")
def health_check():
    """Quick health check — verifies DB connectivity."""
    try:
        result = execute_raw_sql("SELECT SYSTEM_USER AS [User], DB_NAME() AS [Database]")
        return {
            "status": "ok",
            "environment": get_current_env(),
            "connection": result[0] if result else None,
        }
    except Exception as e:
        return {
            "status": "error",
            "environment": get_current_env(),
            "error": str(e),
        }


# ========== Frontend Static Files ==========
# Serve index.html at the root, and all other static assets (js, css, images)
# This MUST come after all /api/* routes.

@app.get("/")
def serve_index():
    """Serve the main dashboard HTML."""
    return FileResponse(FRONTEND_DIR / "index.html")


# Mount static files for js, css, images — serves anything in the frontend dir
app.mount("/", StaticFiles(directory=str(FRONTEND_DIR)), name="frontend")
