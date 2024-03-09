UPDATE Locations SET `Name` = @Name, `Latitude` = @Latitude, `Longitude` = @Longitude
WHERE Locations.Id = @Id
    AND Locations.UserId = @UserId;