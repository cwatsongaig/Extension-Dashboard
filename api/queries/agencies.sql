-- Active Agencies — for samplePremiumAR / agency views
-- Parameters: @Branch (branch ID, multi-value supported)
SELECT
    br.Name AS Branch,
    br.Code AS BranchCode,
    a.Name AS Agency,
    a.AgencyCode,
    CASE WHEN a.Inactive = 0 THEN 'Active' ELSE 'Inactive' END AS Status
FROM Agencies a
INNER JOIN Branches br ON a.BranchId = br.Id
WHERE a.Inactive = 0
  AND br.Id IN (@Branch)
ORDER BY br.Name, a.Name
