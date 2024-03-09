DELETE FROM Locations 
WHERE Locations.Id = @Id 
    AND Locations.UserId = @UserId;