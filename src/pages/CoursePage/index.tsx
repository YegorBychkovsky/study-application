import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import {
  courseSelect,
  fetchingCourseById,
  firstVideoSelect,
} from '../../redux/slices/courseSlice/slice';
import { useAppDispatch } from '../../redux/store';
import styles from './CoursePage.module.scss';

import Hls from 'hls.js';
import { useNavigate } from 'react-router-dom';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

const CoursePage = () => {
  const navigate = useNavigate();

  const appDispatch = useAppDispatch();

  const course = useSelector(courseSelect);
  const firstVideo = useSelector(firstVideoSelect);

  const [currentTime, setCurrentTime] = React.useState(0);
  const [videoUrl, setVideoUrl] = React.useState(`${course?.lessons[0].link}`);
  const [videoSpeed, setVideoSpeed] = React.useState(1);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  let i = 0;

  React.useEffect(() => {
    const id = localStorage.getItem('courseId');
    if (id) {
      appDispatch(fetchingCourseById({ id }));
    }
  }, []);

  React.useEffect(() => {
    handleMouseEnter(firstVideo);
  }, [firstVideo]);

  React.useEffect(() => {
    localStorage.setItem(`videoProgress${videoUrl}`, String(currentTime));
  }, [currentTime]);

  const handleVideoEnd = () => {
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime || 0);
    setPlayBack();
  };

  const handleMouseEnter = React.useCallback(
    (videoUrl: string, duration?: number, id?: string) => {
      const video = videoRef.current;

      const config = {
        startPosition: Number(localStorage.getItem(`videoProgress${videoUrl}`)) || 0, // can be any number you want
      };
      if (video) {
        if (Hls.isSupported()) {
          const hls = new Hls(config);
          hls.loadSource(videoUrl);
          console.log(videoUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoUrl + '?autoplay=1&second=15';
          video.addEventListener('loadedmetadata', () => {
            video.play();
          });
        }
      }
    },
    [videoUrl],
  );

  const handleLessonClick = (status: string, url: string, duration: number, id: string) => {
    if (status === 'unlocked') {
      setVideoUrl(url);
      handleMouseEnter(url, duration, id);
    } else {
      alert('this video is locked');
    }
  };

  const setPlayBack = React.useCallback(() => {
    if (videoRef.current !== null) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  const handleAnswerChange = (event: KeyboardEvent) => {
    if (event.key === '+') {
      setVideoSpeed(videoSpeed + 0.1);
    } else if (event.key === '-') {
      setVideoSpeed(videoSpeed - 0.5);
    }
  };

  return (
    <div className={styles.container}>
      <Card
        sx={{
          maxWidth: 500,
          height: 700,
          position: 'relative',
        }}>
        <video
          height={300}
          ref={videoRef}
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onCanPlay={() => setPlayBack()}
          onKeyDown={handleAnswerChange}
          // onKeyPress={handleAnswerChange}
          controls
        />
        <Typography gutterBottom variant="h6" component="div" sx={{ height: 80, fontSize: 10 }}>
          Current video speed: {videoSpeed} <br />
          hot keys: <br /> "+" video speed + 0.1 <br /> "-" video speed - 0.1
        </Typography>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ height: 80 }}>
            {course?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
            {course?.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              paddingLeft: '10%',
              textAlign: 'start',
              paddingTop: '20px',
              height: 120,
            }}>
            <span>Lessons :</span> <br />
            {course?.lessons.map((lesson) => {
              i++;
              return (
                <span key={lesson.id} style={{ cursor: 'pointer' }}>
                  {i + '. '}
                  <b
                    onClick={() =>
                      handleLessonClick(lesson.status, lesson.link, lesson.duration, lesson.id)
                    }>
                    {lesson.title}
                    {lesson.status === 'unlocked' ? (
                      <>
                        <span style={{ color: 'green' }}> unlocked</span>
                        <br />
                      </>
                    ) : (
                      <>
                        <span style={{ color: 'red' }}> locked</span>
                        <br />
                      </>
                    )}
                  </b>
                </span>
              );
            })}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: '20px' }}></Typography>
        </CardContent>
        <CardActions sx={{ position: 'absolute', bottom: '10px' }}>
          <Button
            onClick={() => {
              navigate('/');
            }}
            size="small">
            Back
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default CoursePage;
