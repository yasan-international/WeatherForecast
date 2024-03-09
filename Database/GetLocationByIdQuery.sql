SELECT Locations.Id,
    Locations.Name,
    Locations.UserId,
    Locations.Latitude,
    Locations.Longitude
FROM Locations
WHERE Locations.UserId = @UserId
    AND Locations.Id = @LocationId;