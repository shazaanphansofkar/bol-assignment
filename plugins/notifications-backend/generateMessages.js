import WebSocket from 'ws'
const generateMessage = () => {
    const ws = new WebSocket('http://7071/notifications/ws');

	ws.on("open", () => {
	
    const generator = () => {
        const notification = {
            title: "Alert5",
            message: "Something 5 happened"
        };
        ws.send(JSON.stringify(notification));
    };

    setInterval(() => {
        generator();
    }, 3000);
	});

};

generateMessage();
