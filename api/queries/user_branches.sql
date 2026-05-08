-- User Branches — returns all branches a user has access to
-- Parameters: @Username (the user's login username)
SELECT
    br.Id AS BranchId,
    br.Code AS BranchCode,
    br.Name AS BranchName,
    ub.IsPrimary
FROM UserBranches ub
INNER JOIN Users u ON ub.UserId = u.Id
INNER JOIN Branches br ON ub.BranchId = br.Id
WHERE u.UserName = @Username
ORDER BY ub.IsPrimary DESC, br.Name
