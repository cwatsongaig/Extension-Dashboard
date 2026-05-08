-- All Bonds — for sampleBonds
-- Parameters: @StartDate, @EndDate (date range for bond creation)
SELECT
    b.BondNumber,
    CAST(b.DateCreated AS DATE) AS DateCreated,
    CAST(bd.EffectiveDate AS DATE) AS EffectiveDate,
    CAST(bd.ExpirationDate AS DATE) AS ExpirationDate,
    a.AgencyCode,
    a.Name AS Agency,
    br.Code AS BranchCode,
    br.Name AS Branch,
    u.UserName AS Underwriter,
    bc.BondClassDescription AS BondClass
FROM Bonds b
LEFT JOIN BondDetails bd ON bd.BondId = b.Id
LEFT JOIN Agencies a ON bd.AgencyId = a.Id
LEFT JOIN Branches br ON br.Id = bd.BranchId
LEFT JOIN Users u ON bd.ResponsibleUnderwriterId = u.Id
LEFT JOIN BondCategories bc ON bc.Id = bd.BondCategoryId
WHERE bc.BondClassDescription <> 'Bid'
  AND b.BondNumber <> 'NULL'
  AND b.BondNumber IS NOT NULL
  AND b.DateCreated BETWEEN @StartDate AND @EndDate
ORDER BY b.BondNumber ASC
