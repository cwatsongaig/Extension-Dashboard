-- Line of Authority — for sampleLOAData
-- Parameters: @Status (e.g., 'Active/Approved', 'Pending', 'Expired')
-- Returns all LOAs filtered by status

SELECT
    bba.AccountName,
    bba.AccountID,
    bba.AccountNumber,
    TRIM(bba.CustomerNumber) AS CustomerNumber,
    COALESCE(snapReviewState, a.ReviewState) AS ReviewStateId,
    CASE
        WHEN l.ExpirationDate < GETDATE() THEN 'Expired'
        WHEN COALESCE(snapReviewState, a.ReviewState) IN (80, 81, 82, 83) THEN 'Pending'
        WHEN COALESCE(snapReviewState, a.ReviewState) >= 84 THEN 'Active/Approved'
    END AS LOA_Status,
    FORMAT(l.EffectiveDate, 'MM/dd/yyyy') AS EffectiveDate,
    FORMAT(l.ExpirationDate, 'MM/dd/yyyy') AS ExpirationDate,
    l.Single,
    l.Aggregate,
    l.ToUser,
    loaType.LookupValue AS LOAType,
    br.Name AS Branch,
    br.Code AS BranchCode,
    u.UserName AS AssignedUser

INTO #tmp

FROM tblAccountReviewLOA l
LEFT JOIN tblAccountReview a ON l.AccountReviewId = a.Id
LEFT JOIN tblBondBoxAccounts bba ON bba.AccountID = a.AccountID
LEFT JOIN tblLookupValue loaType ON loaType.LookupValueID = l.TypeId
LEFT JOIN (
    SELECT * FROM (
        SELECT AccountReviewId,
            JSON_VALUE(AccountReviewData, '$.ReviewState') AS snapReviewState,
            Version,
            ROW_NUMBER() OVER(PARTITION BY AccountReviewId ORDER BY Version DESC) AS rn
        FROM tblAccountReviewSnapshot
    ) a WHERE a.rn = 1
) snap ON snap.AccountReviewId = l.AccountReviewId
LEFT JOIN Accounts acct ON TRY_CAST(bba.AccountID AS INT) = acct.Id
LEFT JOIN Agencies ags ON acct.AgencyId = ags.Id
LEFT JOIN Branches br ON ags.BranchId = br.Id
LEFT JOIN Users u ON l.ToUser = u.Id
ORDER BY bba.AccountID, l.ToUser

SELECT * FROM #tmp
WHERE LOA_Status IN (@Status)
ORDER BY AccountName
