import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingCourses, lastCoursesSelect } from '../../redux/slices/getCoursesSlice/slice';
import { useAppDispatch } from '../../redux/store';

import styles from './MainPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { CourseType } from '../../redux/slices/getCoursesSlice/types';
import { addCourseId, courseSelect } from '../../redux/slices/courseSlice/slice';

import Hls from 'hls.js';

const MainPage = () => {
  const navigate = useNavigate();

  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();

  const courses = useSelector(lastCoursesSelect);
  const [firstIndexOfSlice, setFirstIndexOfSlice] = React.useState(0);
  const [secondIndexOfSlice, setSecondIndexOfSlice] = React.useState(10);

  const revealVideoRef = React.useRef<any>([]);
  revealVideoRef.current = [];

  const handleChoosePageClick = (from: number, to: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setFirstIndexOfSlice(from);
    setSecondIndexOfSlice(to);
  };

  const handleMouseEnter = (videoUrl: string, i?: number) => {
    if (i !== undefined) {
      const video = revealVideoRef.current[i];
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
    } else {
      return;
    }
    return;
  };

  const handlerCardClick = (course: CourseType) => {
    navigate(`/course/${course.id}`);
    dispatch(addCourseId(course.id));
  };

  React.useEffect(() => {
    appDispatch(fetchingCourses());
  }, []);

  const addToRefs = (el: HTMLVideoElement) => {
    if (el && !revealVideoRef.current.includes(el)) {
      revealVideoRef.current.push(el);
    }
  };

  return (
    <div className={styles.main}>
      {courses.slice(firstIndexOfSlice, secondIndexOfSlice).map((course: CourseType, i) => {
        localStorage.setItem(`video of course: ${course.id}`, course.meta.courseVideoPreview.link);
        return (
          <Card
            sx={{ maxWidth: 500, height: 700, position: 'relative' }}
            key={i}
            onClick={() => handlerCardClick(course)}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image={course.previewImageLink + '/cover.webp'}
            />
            <video
              height={300}
              onMouseEnter={() => handleMouseEnter(course.meta.courseVideoPreview.link, i)}
              onMouseLeave={() => handleMouseEnter('')}
              ref={addToRefs}
              src={course.meta.courseVideoPreview.link}
              controls
              muted
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ height: 80 }}>
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
                {course.description}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ paddingLeft: '10%', textAlign: 'start', paddingTop: '20px', height: 120 }}>
                {course.meta.skills?.map((skill, i) => (
                  <b key={i}>
                    ▪️ {skill}
                    <br />
                  </b>
                ))}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '20px' }}>
                Lessons: <b>{course.lessonsCount}</b> Rating: <b>{course.rating} / 5</b>
              </Typography>
            </CardContent>
            <CardActions sx={{ position: 'absolute', bottom: '10px' }}>
              <Button onClick={() => handlerCardClick} size="small">
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
      <Stack spacing={2} direction="row">
        <Button onClick={() => handleChoosePageClick(0, 10)} variant="contained">
          1
        </Button>
        <Button onClick={() => handleChoosePageClick(10, 20)} variant="contained">
          2
        </Button>
        <Button onClick={() => handleChoosePageClick(20, 28)} variant="contained">
          3
        </Button>
      </Stack>
    </div>
  );
};
export default MainPage;
