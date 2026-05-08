-- Account Review Ratings — for sampleARRs
-- Parameters: @Branch (branch ID, multi-value supported)
-- Returns the most recent ARR per account with review state, grade, assignee

SELECT a.ID AS AccountID,
    a.AccountName,
    ar.ID AS ReviewId,
    ar.Created,
    FORMAT(ar.Created, 'MM/dd/yyyy') AS CreatedDate,
    CASE
        WHEN ar.ReviewState > 84 THEN arh.Reviewer
        WHEN JSON_VALUE(ars.AccountReviewData, '$.ReviewState') > 80 THEN arh.Reviewer
        ELSE COALESCE(ar.NextReviewNameId, ar.CreatedVid)
    END AS Assignee,
    CASE
        WHEN ar.ReviewState > 84 THEN ar.ReviewState
        WHEN JSON_VALUE(ars.AccountReviewData, '$.ReviewState') > 80 THEN JSON_VALUE(ars.AccountReviewData, '$.ReviewState')
        ELSE ar.ReviewState
    END AS ReviewStateId,
    CASE
        WHEN ar.ReviewState > 84 THEN arh.Action
        WHEN JSON_VALUE(ars.AccountReviewData, '$.ReviewState') > 80 THEN arh.Action
        ELSE lv.LookupValue
    END AS ReviewState,
    CASE
        WHEN fs.FiscalYearEnd = 1 THEN 'Annual'
        ELSE 'Interim'
    END AS FinancialStatementType,
    FORMAT(fs.StatementDate, 'MM/dd/yyyy') AS StatementDate,
    rtlv.LookupValue AS ReviewType,
    br.Id AS BranchId,
    br.Code + ' - ' + br.Name AS Branch,
    CASE
        WHEN ar.ReviewState > 84 THEN hrglv.LookupValue
        WHEN JSON_VALUE(ars.AccountReviewData, '$.ReviewState') > 80 THEN hrglv.LookupValue
        ELSE rglv.LookupValue
    END AS ReviewGrade,
    FORMAT(arh.ApprovalDate, 'MM/dd/yyyy') AS ApprovalDate,
    COALESCE(ars.Version, 1) AS Version

INTO #tmp

FROM vw_tblAccountReview ar
    LEFT JOIN vw_tblLookupValue lv ON ar.ReviewState = lv.LookupValueID
    LEFT JOIN vw_tblFinancialStatement fs ON ar.FinancialStatementID = fs.FinancialStatementID
    LEFT JOIN (
        SELECT AccountReviewId, AccountReviewData, Version,
            ROW_NUMBER() OVER(PARTITION BY AccountReviewId ORDER BY Version DESC) AS rn
        FROM vw_tblAccountReviewSnapshot
    ) ars ON ar.ID = ars.AccountReviewId AND ars.rn = 1
    LEFT JOIN (
        SELECT *, ROW_NUMBER() OVER(PARTITION BY AccountReviewID ORDER BY CAST(ApprovalDate AS DATETIME) DESC) AS ROWNUM
        FROM vw_tblAccountReviewHistory
    ) arh ON ar.ID = arh.AccountReviewId AND arh.ROWNUM = 1
    LEFT JOIN vw_tblLookupValue rtlv ON ar.ReviewTypeID = rtlv.LookupValueID
    LEFT JOIN vw_tblLookupValue rglv ON ar.ReviewGrade = rglv.LookupValueID
    LEFT JOIN vw_tblLookupValue hrglv ON arh.AccountGrade = hrglv.LookupValueID
    INNER JOIN Accounts a ON ar.AccountID = a.Id
    LEFT JOIN Agencies ags ON a.AgencyId = ags.Id
    LEFT JOIN Branches br ON ags.BranchId = br.Id

SELECT
    t.AccountID,
    t.AccountName,
    t.Branch,
    t.FinancialStatementType AS FsType,
    t.StatementDate AS FsDate,
    t.ReviewType AS Type,
    t.ReviewState,
    t.CreatedDate AS ArrCreatedDate,
    t.Assignee,
    t.ApprovalDate AS ArrApprovalDate,
    t.ReviewGrade AS Grade
FROM (
    SELECT *,
        ROW_NUMBER() OVER(PARTITION BY AccountID ORDER BY CAST(Created AS DATETIME) DESC) AS ARRow
    FROM #tmp
    WHERE BranchId IN (@Branch)
) t
WHERE t.ARRow = 1
ORDER BY t.AccountName
