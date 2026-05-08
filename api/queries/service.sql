-- Service and Activity — for sampleServiceActivity
-- Parameters: @Branch (branch code), @Year (year as int)
SELECT
    br.Code AS BranchCode,
    br.Name AS Branch,
    u.UserName,
    p.FirstName + ' ' + p.LastName AS FullName,
    bal.BondActionName AS Action,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 1 THEN 1 ELSE 0 END) AS Jan,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 2 THEN 1 ELSE 0 END) AS Feb,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 3 THEN 1 ELSE 0 END) AS Mar,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 4 THEN 1 ELSE 0 END) AS Apr,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 5 THEN 1 ELSE 0 END) AS May,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 6 THEN 1 ELSE 0 END) AS Jun,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 7 THEN 1 ELSE 0 END) AS Jul,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 8 THEN 1 ELSE 0 END) AS Aug,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 9 THEN 1 ELSE 0 END) AS Sep,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 10 THEN 1 ELSE 0 END) AS Oct,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 11 THEN 1 ELSE 0 END) AS Nov,
    SUM(CASE WHEN MONTH(bal.DateCreated) = 12 THEN 1 ELSE 0 END) AS [Dec],
    COUNT(*) AS YTD
FROM BondDetails bd
INNER JOIN BondActionLogs bal ON bd.BondId = bal.BondId
INNER JOIN Bonds b ON bal.BondId = b.Id
INNER JOIN Branches br ON bd.BranchId = br.Id
INNER JOIN Users u ON bal.ModifiedBy = u.Id
INNER JOIN SecurityRoles sr ON sr.Id = u.SecurityRoleId
INNER JOIN People p ON p.Id = u.PersonId
INNER JOIN Agencies ag ON bd.AgencyId = ag.Id AND bd.BranchId = ag.BranchId
WHERE bal.BondActionId IN (20, 47, 48, 17, 4, 55, 10, 6)
  AND sr.Name NOT IN ('e-SuretySupport', 'GAI Read-Only', 'Consumer', 'Reinsurer', 'Anonymous')
  AND u.UserName <> 'esurety'
  AND b.BondNumber IS NOT NULL
  AND YEAR(bal.DateCreated) = @Year
  AND br.Code IN (@Branch)
GROUP BY br.Code, br.Name, u.UserName, p.FirstName, p.LastName, bal.BondActionName
ORDER BY br.Code, FullName, Action
