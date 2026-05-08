"""
BondBox API — Environment Configuration

Toggle between Cert and Prod via environment variables:

  Set these in your system/user environment variables:
    BONDBOX_ENV=cert              (default if not set)
    BONDBOX_SERVER_CERT=AAG_SQL2017ENP.ga.afginc.com,1436
    BONDBOX_DB_CERT=BondBox_DataInterface_Cert
    BONDBOX_SERVER_PROD=AAG_SQL2017ENP.ga.afginc.com,1436
    BONDBOX_DB_PROD=BondBox_DataInterface

  Or override at runtime via the /api/env endpoint.
"""

import os

# Environment definitions
ENVIRONMENTS = {
    "cert": {
        "server": os.environ.get("BONDBOX_SERVER_CERT", "AAG_SQL2017ENP.ga.afginc.com,1436"),
        "database": os.environ.get("BONDBOX_DB_CERT", "BondBox_DataInterface_Cert"),
        "label": "CERT",
        "read_only_intent": True,
    },
"prod": {
    "server": os.environ.get("BONDBOX_SERVER_PROD", "AAG_SQL2017E.ga.afginc.com,1436"),
    "database": os.environ.get("BONDBOX_DB_PROD", "BondBox_DataInterface_Prod"),
    "label": "PROD",
    "read_only_intent": False,
},
}

# Current active environment (mutable at runtime)
_current_env = os.environ.get("BONDBOX_ENV", "cert").lower()


def get_current_env() -> str:
    return _current_env


def set_current_env(env: str) -> None:
    global _current_env
    env = env.lower()
    if env not in ENVIRONMENTS:
        raise ValueError(f"Unknown environment '{env}'. Must be one of: {list(ENVIRONMENTS.keys())}")
    _current_env = env


def get_connection_config() -> dict:
    """Returns the server + database for the currently active environment."""
    return ENVIRONMENTS[_current_env]


# Secondary connection: Bonds_Financial_Entry (WIP data, on a different server)
FINANCIAL_ENTRY_CONFIG = {
    "server": os.environ.get("BONDBOX_FE_SERVER", "AAG_SQL2017.ga.afginc.com,1439"),
    "database": os.environ.get("BONDBOX_FE_DB", "Bonds_Financial_Entry"),
}


def get_financial_entry_config() -> dict:
    """Returns the server + database for the Bonds_Financial_Entry connection."""
    return FINANCIAL_ENTRY_CONFIG
