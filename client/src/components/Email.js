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
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`;
    }

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