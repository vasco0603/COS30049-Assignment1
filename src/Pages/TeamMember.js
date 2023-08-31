import './TeamMember.css'
import Member1 from '../Component/images/Member1.jpeg';
import Member2 from '../Component/images/Member2.jpeg';
import Member3 from '../Component/images/Member3.jpeg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Draweer from './../Component/drawer';

export default function TeamMember() {
    return (
        <Box id='intro-box'>

            <h1 className='model-title'>TEAM INTRODUCTION</h1>
            <Draweer />
            <Grid container spacing={3} className="members">
                {[Member1, Member2, Member3].map((member, index) => (

                    <Grid item xs={12} sm={6} md={4} key={index}>

                        <Grid xs={12} sm={12} md={12} className="member">

                            <img width={200} height={200} src={member} alt={`Member ${index + 1}`} />

                            <Grid xs={12} sm={12} md={12} className="description">
                                <h1>{['Axel Matthew Winjoto', 'Michael Haryanto', 'Charson Chen'][index]}</h1>
                                <h2>{['Data Science', 'Artificial Intelligence', 'Cybersecurity'][index]}</h2>
                                <p>{['103834503', '103841613', '103814505'][index]}</p>
                            </Grid>

                        </Grid>

                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
