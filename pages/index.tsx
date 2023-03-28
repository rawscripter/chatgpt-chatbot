import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import { Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {

    const [message, setMessage] = React.useState('');

    const [messages, setMessages] = React.useState([])

    const [loading, setLoading] = React.useState(false)

    const onSubmit = () => {
        if (message === '' && !loading) return
        setLoading(true)

        const lastConversation: any = messages[messages.length - 1]

        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, id: lastConversation ? lastConversation.id : 0 }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages([...messages, data])
                setMessage('')
            }).catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            });
    }




    return (
        <Container maxWidth="sm">
            {/* add a text logo and place it center */}
            <Box sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    BuildPilot ChatBot
                </Typography>
            </Box>
            <Box>
                <>
                    <Paper style={{ maxHeight: 550, height: 550, width: 600, overflow: 'auto', marginTop: 30 }}>

                        {messages && messages.map((message, index) => {

                            return (
                                <>
                                    <List>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={message.text}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >

                                                        </Typography>
                                                        {' - ' + message.question}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </List>

                                </>
                            )
                        })}
                        {/* show "Start Conversation" if messages is 0 */}

                        {messages.length === 0 &&
                            <Typography variant="h6" component="h6" style={{ textAlign: 'center', marginTop: 100 }}>
                                Start Conversation
                            </Typography>
                        }
                    </Paper>
                </>
            </Box>

            {/* message input box */}

            <Box style={{ width: 600, marginTop: 10 }} >
                {/* full width input box with white backgroud */}
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={2}
                    defaultValue=""
                    placeholder="Type your question here"
                    variant="outlined"
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                {/* add submit button */}
                <Button
                    onClick={onSubmit}
                    sx={{ mt: 1, color: 'white' }} fullWidth variant="contained">
                    {/* show loading if loading is true */}
                    {loading ? <CircularProgress color="inherit" size={24} /> : 'Submit'}
                </Button>
            </Box>

        </Container>
    );
}
