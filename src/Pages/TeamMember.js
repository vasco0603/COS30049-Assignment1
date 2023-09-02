// Importing necessary CSS and image assets
import './TeamMember.css';
import Member1 from '../Component/images/Member1.jpeg';
import Member2 from '../Component/images/Member2.jpeg';
import Member3 from '../Component/images/Member3.jpeg';

// Importing Material-UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Importing custom component
import Draweer from './../Component/drawer';

// TeamMember component definition
export default function TeamMember() {
    return (
        // Outer container for the team introduction
        <Box id='intro-box'>

            {/* Title for the team introduction */}
            <h1 className='model-title'>TEAM INTRODUCTION</h1>

            {/* Drawer component (possibly a menu or additional info) */}
            <Draweer />

            {/* Grid container to layout team members */}
            <Grid container spacing={3} className="members">
                {/* Mapping over the array of member images to generate individual member cards */}
                {[Member1, Member2, Member3].map((member, index) => (

                    // Grid item for each member
                    <Grid item xs={12} sm={6} md={4} key={index}>

                        {/* Inner grid for member details */}
                        <Grid xs={12} sm={12} md={12} className="member">

                            {/* Displaying member image */}
                            <img width={200} height={200} src={member} alt={`Member ${index + 1}`} />

                            {/* Grid for member description */}
                            <Grid xs={12} sm={12} md={12} className="description">
                                {/* Displaying member name */}
                                <h1>{['Axel Matthew Winjoto', 'Michael Haryanto', 'Charson Chen'][index]}</h1>
                                {/* Displaying member specialization */}
                                <h2>{['Data Science', 'Artificial Intelligence', 'Cybersecurity'][index]}</h2>
                                {/* Displaying member ID */}
                                <p>{['103834503', '103841613', '103814505'][index]}</p>
                            </Grid>

                        </Grid>

                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
