import { getDBConnection } from '../mysql/db.js';


export const addSchool = async (req, res) => {
    try {

        const {name, address, latitude, longitude} = req.body;

        // non-empty validation check
        if(!name || !address || !latitude || !longitude){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // datatypes validation check
        if(typeof name !== 'string' || 
           typeof address !== 'string' || 
           typeof latitude !== 'number' || 
           typeof longitude !== 'number'
        ){
            return res.status(400).json({ message: 'Invalid data types' });
        }

        // client
        const db = await getDBConnection()

        // checking if school already exists in schools table
        const values = [name, address, latitude, longitude]

        const [IsSchoolExists] = await db.query(`
            SELECT * FROM schools where name = ? AND address = ?`,
            [values[0], values[1]]
        )

        if(IsSchoolExists.length > 0){
            return res.status(400).json({message: 'The provided school already exists'})
        }


        // inserting values into schools table
        const [insertResult] = await db.query(`
            INSERT INTO schools (name, address, latitude, longitude)
            VALUES (?, ?, ?, ?)`,
            values
        )

        // retriveing the newly created school using insertId
        const [rows] = await db.query('SELECT * FROM schools where id = ?', [insertResult.insertId])

        const newSchool = rows[0];

        res.status(200).json({message: 'School added successfully',
                              school: newSchool
                            })

        
    } catch (error) {
        console.error('Add School Error: ', error);
        res.status(500).json({message: 'Server error'})
    }
}