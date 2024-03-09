SELECT Users.Id,
    Users.Contact,
    Users.IsGuest
FROM Users
WHERE Users.Id = @UserId;