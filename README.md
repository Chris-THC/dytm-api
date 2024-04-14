
# YouTube music downloader API

It's just a silly little project I did to get some tracks, you know to learn how can I do it. It also needs more optimization and some other things that I couldn't add, just run the Docker command and you can check it with Postman or some frontend.

And I am not responsible for its misuse.

## Features

- Download track from YT



## Run Locally

Clone the project

By the way I'll assume that you already have Docker installed and if not then look for a tutorial on how to install it on your operating system.



Go to the project directory

```bash
  cd my-project
```

Run this command to start the server

```bash
  docker-compose up --build
```

Run this command to stop the server

```bash
   docker-compose down
```


## API Reference

#### Download a track

Add id from Youtube Music

videoId: suk7JSx6qQs 

```http
  POST http://localhost:5022/ytdl/suk7JSx6qQs
```

#### Body

```JSON
{
    "titleTrack": "Burn It Down",
    "artistTrack": "Skillet",
    "albumTrack": "Unleashed",
    "yearTrack": "2016",
    "trackNumber": "1",
    "albumImg": "https://lh3.googleusercontent.com/5k7bYwUzRgZM9blivKiKhim7VmDs3n87CcziXgzHCRIXXkDCJMQRgwX-_Teg1OH46qNfjcQoZqQw1b5s=w544-h544-l90-rj"
}
```


## Tech Stack

**Server:** Node JS, Express


## Acknowledgements

 - [ytdl-core](https://github.com/fent/node-ytdl-core)
 

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Disclaimer ⚠️
I am not responsible for its misuse.

This project and its contents are not affiliated with, funded, authorized, endorsed by, or in any way associated with YouTube, Google LLC or any of its affiliates and subsidiaries.

Any trademark, service mark, trade name, or other intellectual property rights used in this project are owned by the respective owners.
