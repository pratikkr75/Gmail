import { Box, Typography, Checkbox, styled } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// styled components
const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background: '#f2f6fc',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > div': {
        display: 'flex',
        width: '100%'
    },
    '& > div > p': {
        fontSize: 14
    }
});

const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: '#ddd',
    color: '#222',
    borderRadius: 4,
    marginRight: 6,
    padding: '0 4px',
});

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'
});

const Email = ({ email, selectedEmails, setRefreshScreen, setSelectedEmails }) => {
    const navigate = useNavigate();
    const toggleStarredService = useApi(API_URLS.toggleStarredEmail);

    const toggleStarredMails = () => {
        toggleStarredService.call({ id: email._id, value: !email.starred });
        setRefreshScreen(prevState => !prevState);
    }

    const onValueChange = () => {
        if (selectedEmails.includes(email._id)) {
            setSelectedEmails(prevState => prevState.filter(id => id !== email._id));
        } else {
            setSelectedEmails(prevState => [...prevState, email._id]);
        }
    }

    
    const formatDate = (dateString) => {
        console.log('Received dateString:', dateString);
        
        if (!dateString) {
            console.log('dateString is falsy');
            return 'Invalid Date';
        }
        
        let date;
        try {
            // Check if dateString is already a Date object
            if (Object.prototype.toString.call(dateString) === '[object Date]') {
                console.log('dateString is already a Date object');
                date = dateString;
            } else if (typeof dateString === 'string') {
                // If it's a string, try to parse it
                // Remove any trailing 'Z' to avoid double UTC conversion
                const cleanDateString = dateString.replace(/Z$/, '');
                date = new Date(cleanDateString);
            } else {
                // If it's neither a string nor a Date, throw an error
                throw new Error('Unsupported date format');
            }
            
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
            }
        } catch (error) {
            console.error('Error parsing date:', error);
            return 'Invalid Date';
        }
        
        console.log('Parsed date:', date);
        
        // Format the date
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
        return `${day} ${month}`;
    }

    // console.log('Email object:', email);


    return (
        <Wrapper>
            <Checkbox {...label}
                size='small'
                checked={selectedEmails.includes(email._id)}
                onChange={onValueChange}
            />
            {
                email.starred ?
                    <StarIcon fontSize="small" style={{ marginRight: 10, color: '#FFF200' }} onClick={toggleStarredMails} />
                    :
                    <StarBorderOutlinedIcon fontSize="small" style={{ marginRight: 10 }} onClick={toggleStarredMails} />
            }
            <Box onClick={() => navigate(routes.view.path, { state: { email: email } })}>
                <Typography style={{ width: 200, overflow: 'hidden' }}>{email.name}</Typography>
                <Indicator>Inbox</Indicator>
                <Typography>{email.subject} {email.body && '-'} {email.body}</Typography>
                <Date>
                    {formatDate(email.date)}
                </Date>
            </Box>
        </Wrapper>
    )
}

export default Email;