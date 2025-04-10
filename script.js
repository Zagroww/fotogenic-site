if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    let video = document.getElementById('video');
    let startButton = document.getElementById('startButton');
    let message = document.getElementById('message');

    startButton.onclick = async function() {
        message.textContent = "Attivando la fotocamera...";  // Cambia il messaggio
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;

            setTimeout(() => {
                let canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                let context = canvas.getContext("2d");
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                let dataUrl = canvas.toDataURL("image/png");

                console.log("Foto scattata:", dataUrl);  // In un'app reale, invierebbe l'immagine a un server

                message.textContent = "Foto scattata! Grazie per aver partecipato.";

                let tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }, 3000);
        } catch (error) {
            message.textContent = "Non è possibile accedere alla fotocamera.";
        }
    };
} else {
    message.textContent = "Il tuo browser non supporta l'accesso alla fotocamera.";
}
