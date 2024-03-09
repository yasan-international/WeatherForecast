SELECT Locations.Id,
    Locations.Name,
    Locations.Latitude,
    Locations.Longitude
FROM Locations
WHERE Locations.UserId = @UserId;