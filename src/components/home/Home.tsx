import React, { FC } from "react";

import { CardGroup, Card, Button } from "react-bootstrap";


const NFTCard: FC = () => {
    return (
        <Card style={{ width: '18rem', height: '28.6rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

const Home: FC = () => {
    return (
        <div>
            <h1>Home page</h1>
            <CardGroup>

            </CardGroup>
        </div>
    )
}

export default Home

