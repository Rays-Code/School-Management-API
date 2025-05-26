import { getDBConnection } from '../mysql/db.js';
import { haversineDistance } from '../services/getDistanceService.js';


export const listSchool = async (req, res) => {
    try {
        const user_latitude = parseFloat(req.query.latitude);
        const user_longitude = parseFloat(req.query.longitude);

        // non-empty validation check
        if(!user_latitude || !user_longitude){
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        // datatypes validation check
        if(typeof user_latitude !== 'number' || typeof user_longitude !== 'number'
        ){
            return res.status(400).json({ message: 'Invalid data types' });
        }

        // client
        const db = await getDBConnection();

        // retrieving all the schools
        const [allSchools] = await db.query(`SELECT * FROM schools`); 

        // Calculating distance in kilometers of user from each schools and storing them in a array
        const SchoolsWithDistance = [];

        for(let i=0; i<allSchools.length; i++){
            const distance = haversineDistance(
                user_latitude,
                user_longitude,
                allSchools[i].latitude,
                allSchools[i].longitude
            );

            SchoolsWithDistance.push({
                id: allSchools[i].id,
                name: allSchools[i].name,
                distance: parseFloat(distance.toFixed(2)),
                latitude: allSchools[i].latitude,
                longitude: allSchools[i].longitude,
            });
        }

        // sorting schools by distance
        const sortedSchools = SchoolsWithDistance.sort((a, b) => a.distance - b.distance);


         res.status(200).json({message: "Sorted schools based on user's proximity (In kilometers)",
                               sortedSchools: sortedSchools
                            })
        
    } catch (error) {
        console.error('List School Error: ', error);
        res.status(500).json({message: 'Server error'})
    }
}