-- Financial Statement Timeliness — for sampleFinancials
-- Parameters: @Branch (branch ID, multi-value supported)
-- Returns account-level financial statement status

SELECT
    br.Code AS BranchCode,
    br.Name AS Branch,
    a.Id AS AccountId,
    a.AccountName,
    a.AccountNumber,
    u.UserName AS Underwriter,
    p.FirstName + ' ' + p.LastName AS UnderwriterName,
    CASE
        WHEN fs.FinancialStatementId IS NOT NULL AND fs.IsBalanced = 1 THEN 'Received'
        ELSE 'Not Yet Received'
    END AS ProfitabilityStatus,
    FORMAT(fs.StatementDate, 'MM/dd/yyyy') AS StatementDate,
    fs.FiscalYearEnd
FROM Branches br
INNER JOIN Agencies ags ON br.Id = ags.BranchId
INNER JOIN Accounts a ON a.AgencyId = ags.Id
LEFT JOIN Users u ON a.UnderwriterId = u.Id
LEFT JOIN People p ON u.PersonId = p.Id
LEFT JOIN vw_tblBondBoxAccounts bba ON a.Id = TRY_CAST(bba.AccountID AS INT)
LEFT JOIN (
    SELECT fs2.BondBoxAccountID, fs2.FinancialStatementId, fs2.IsBalanced,
        fs2.StatementDate, fs2.FiscalYearEnd,
        ROW_NUMBER() OVER(PARTITION BY fs2.BondBoxAccountID ORDER BY fs2.StatementDate DESC) AS rn
    FROM vw_tblFinancialStatement fs2
    WHERE fs2.IsBalanced = 1
) fs ON fs.BondBoxAccountID = bba.BondBoxAccountsID AND fs.rn = 1
WHERE a.AccountStatus = 1
  AND br.RegionCode NOT IN ('BCOMM')
  AND br.Id IN (@Branch)
ORDER BY br.Name, a.AccountName
