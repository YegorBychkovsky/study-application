import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingCourses, lastCoursesSelect } from '../../redux/slices/getCoursesSlice/slice';
import { useAppDispatch } from '../../redux/store';
import Hls from 'hls.js';

import styles from './MainPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { CourseType } from '../../redux/slices/getCoursesSlice/types';
import { addCourseId } from '../../redux/slices/courseSlice/slice';

const MainPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlerCardClick = (course: CourseType) => {
    navigate(`/course/${course.id}`);
    dispatch(addCourseId(course.id));
  };

  const url =
    'https://www.youtube.com/watch?v=WonKEtdOOFE&ab_channel=%D0%A0%D0%B0%D0%B1%D0%BA%D0%BE%D1%80';
  const appDispatch = useAppDispatch();
  const courses = useSelector(lastCoursesSelect);

  React.useEffect(() => {
    appDispatch(fetchingCourses());
  }, []);

  return (
    <div className={styles.main}>
      {courses.slice(0, 10).map((course: CourseType, i) => (
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
              {course.meta.skills.map((skill, i) => (
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
      ))}
    </div>
  );
};
export default MainPage;
