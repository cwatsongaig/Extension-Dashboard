-- Red Flag Audit — for sampleRedFlagData
-- Parameters: @branch (branch code, multi-value supported)
-- Returns red flag counts per account by branch

;WITH account AS (
    SELECT AccountReviewId,
        JSON_VALUE(AccountReviewData, '$.Id') AS Id,
        JSON_VALUE(AccountReviewData, '$.AccountId') AS AccountID,
        JSON_VALUE(AccountReviewData, '$.FinancialStatementId') AS FinancialStatementID,
        ROW_NUMBER() OVER(PARTITION BY JSON_VALUE(AccountReviewData, '$.AccountId') ORDER BY JSON_VALUE(AccountReviewData, '$.Created') DESC) AS rownum
    FROM vw_tblAccountReviewSnapshot
    WHERE JSON_VALUE(AccountReviewData, '$.ReviewState') >= 84
),
Accts AS (
    SELECT br.Code, a.AccountID, a.FinancialStatementID, br.Name, ac.AccountName
    FROM account a
    INNER JOIN Accounts ac ON a.AccountID = ac.Id AND ac.AccountStatus = 1
    INNER JOIN Agencies ag ON ag.Id = ac.AgencyId
    INNER JOIN Branches br ON ag.BranchId = br.Id AND br.RegionCode != 'BCOMM'
    WHERE a.rownum = 1
),
redflags AS (
    SELECT a.Code, a.Name AS BranchName, a.AccountName, a.AccountID,
        R.RedFlagName, R.IsRedFlagTrueAsAllowed,
        fs.StatementDate
    FROM Accts a
    INNER JOIN vw_tblFinancialStatement fs ON a.FinancialStatementID = fs.FinancialStatementID
    INNER JOIN vw_tblFinancialStatementRedFlagResult R ON R.FinancialStatementId = fs.FinancialStatementID
    WHERE R.IsRedFlagTrueAsAllowed = 1
      AND a.Code IN (@branch)
      AND R.RedFlagName IN ('zScore', 'Net Quick', 'Net Worth', 'Debt/Equity',
          'Underbillings/Net Worth', 'Underbillings/Net Quick', 'Net Cash',
          'Net Income', 'Net Quick/LOA', 'Net Worth/LOA', 'Net Quick/WOH', 'Net Worth/WOH')
)

SELECT
    Code AS BranchCode,
    BranchName,
    AccountName,
    AccountID,
    FORMAT(MAX(StatementDate), 'MM/dd/yyyy') AS FinancialStatement,
    SUM(CASE WHEN RedFlagName = 'zScore' THEN 1 ELSE 0 END) AS ZScore,
    SUM(CASE WHEN RedFlagName = 'Debt/Equity' THEN 1 ELSE 0 END) AS DebtEquity,
    SUM(CASE WHEN RedFlagName = 'Net Quick/LOA' THEN 1 ELSE 0 END) AS NqLOA,
    SUM(CASE WHEN RedFlagName = 'Net Worth/LOA' THEN 1 ELSE 0 END) AS NwLOA,
    SUM(CASE WHEN RedFlagName = 'Net Quick/WOH' THEN 1 ELSE 0 END) AS NqWOH,
    SUM(CASE WHEN RedFlagName = 'Net Worth/WOH' THEN 1 ELSE 0 END) AS NwWOH,
    SUM(CASE WHEN RedFlagName = 'Underbillings/Net Quick' THEN 1 ELSE 0 END) AS UbNQ,
    SUM(CASE WHEN RedFlagName = 'Underbillings/Net Worth' THEN 1 ELSE 0 END) AS UbNW,
    SUM(CASE WHEN RedFlagName = 'Net Cash' THEN 1 ELSE 0 END) AS NetCash,
    SUM(CASE WHEN RedFlagName = 'Net Income' THEN 1 ELSE 0 END) AS NetIncome,
    COUNT(*) AS FlagCount
FROM redflags
GROUP BY Code, BranchName, AccountName, AccountID
ORDER BY BranchName, AccountName
