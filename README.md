# Project Name

## Upload Video

This project is designed to allow users to upload videos to platforms such as TikTok and YouTube.

---

## Code Formatting with Prettier

To maintain code consistency and readability, you can use Prettier to format individual files or the entire codebase. Below are some useful commands for formatting:

### Format a Single File

To format a specific file, run the following command:

```bash
npx prettier --write path/to/your/file.js
```

### Running Prettier via npm Script

To format the entire codebase using the predefined npm script, run:

```bash
npm run format
```

---

## Docker Setup Guide

This guide provides instructions on how to set up and run the project using Docker.

### Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) (version 20.x or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (if not included with Docker)

### Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### Setting Up Environment Variables

Create an `.env` file in the root directory based on the `.env.example` provided. Update any required values:

```bash
cp .env.example .env
```

Edit the `.env` file to configure the environment variables for your project.

### Building Docker Containers

To build the necessary containers, run the following command from the root of the project directory:

```bash
docker-compose build
```

This command will create the Docker images defined in the `docker-compose.yml` file.

### Running Docker Containers

Once the containers are built, you can start the services:

```bash
docker-compose up
```

If you prefer to run it in detached mode (in the background), use the following command:

```bash
docker-compose up -d
```

### Stopping Docker Containers

To stop the running containers:

```bash
docker-compose down
```

This command will gracefully stop the services and remove the containers.

### Common Docker Commands

- **View Logs**: To view logs for a specific service:
  ```bash
  docker-compose logs <service-name>
  ```
- **Access Container Shell**: To enter a container for debugging or running commands:
  ```bash
  docker exec -it <container-name> /bin/bash
  ```
- **Rebuild a Specific Service**: If you need to rebuild only one service:
  ```bash
  docker-compose up --build <service-name>
  ```

### Cleanup

To remove all containers, networks, volumes, and images created by `docker-compose up`:

```bash
docker-compose down --volumes --remove-orphans
```

---

## Additional Resources

For more information on using Docker, refer to the following:

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/overview/)

For more information on using Prettier:

- [Prettier Documentation](https://prettier.io/docs/en/)

---

### License

This project is licensed under the [MIT License](LICENSE).

### Add subtitle.srt and title to video with ffmpeg

```bash
ffmpeg -i 1730253292779.mp4 -vf "subtitles=1730253292779.srt:force_style='Fontsize=10,Alignment=2,MarginV=30',\
drawtext=text='北海道の美しい自然と豊かなグルメ':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=50:fontfile=NotoSansJP-VariableFont_wght.ttf,\
drawtext=text='北海道の美しい自然と豊かなグルメ':fontcolor=white:fontsize=30:x=(w-text_w)/2+1:y=50:fontfile=NotoSansJP-VariableFont_wght.ttf,\
drawtext=text='北海道の美しい自然と豊かなグルメ':fontcolor=white:fontsize=30:x=(w-text_w)/2-1:y=50:fontfile=NotoSansJP-VariableFont_wght.ttf,\
drawtext=text='北海道の美しい自然と豊かなグルメ':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=50+1:fontfile=NotoSansJP-VariableFont_wght.ttf,\
drawtext=text='北海道の美しい自然と豊かなグルメ':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=50-1:fontfile=NotoSansJP-VariableFont_wght.ttf,\
drawtext=text='北海道の美しい自然と豊かなグルメ':fontcolor=white:fontsize=30:x=(w-text_w)/2+1:y=50+1:fontfile=NotoSansJP-VariableFont_wght.ttf,\
drawtext=text='北海道の美しい自然と豊かなグルメ':fontcolor=white:fontsize=30:x=(w-text_w)/2-1:y=50-1:fontfile=NotoSansJP-VariableFont_wght.ttf" -c:a copy output_1730253292779.mp4
```

```bash
ffmpeg -i 1730253292779.mp4 -vf "subtitles=1730253292779.srt:force_style='Fontsize=10,Alignment=2,MarginV=30',drawtext=text='北海道の美しい自然と豊かなグルメ':fontcolor=white:fontsize=30:borderw=2:bordercolor=black:x=(w-text_w)/2:y=50:fontfile=NotoSansJP-VariableFont_wght.ttf" -c:a copy output_1730253292779.mp4
```
