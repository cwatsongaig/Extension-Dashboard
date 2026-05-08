-- Branch list for dropdowns / filtering
-- Pass ?region=Contract or ?region=Commercial to filter
SELECT
    br.Id,
    br.Code,
    br.Name,
    br.Code + ' - ' + br.Name AS DisplayName,
    br.RegionCode,
    CASE WHEN br.RegionCode = 'BCOMM' THEN 'Commercial' ELSE 'Contract' END AS BranchType
FROM Branches br
WHERE br.Inactive = 0
ORDER BY br.Code
