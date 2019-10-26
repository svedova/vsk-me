import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import context from "../../App.context";
import * as styles from "./Blog.styles.js";
import { Link } from "react-router-dom";

const { Container, Left, Right, ContinueReading } = styles;

let unmounted = false;

const formatDate = d => {
  const date = new Date(d);

  return date.toLocaleDateString("de-CH", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const Blog = ({ Storyblok }) => {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    unmounted = false;

    Storyblok.get("cdn/stories", { starts_with: "blog/" }).then(response => {
      if (unmounted === false) {
        setLatest(response.data.stories);
      }
    });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Container>
      <Left>
        <h3>Latest entries</h3>
        <ul>
          {latest.map(blog => (
            <li key={blog.content._uid}>
              <span className="fa fa-angle-right" />
              <Link to={`/blog/${blog.slug}`}>{blog.content.title}</Link>
            </li>
          ))}
        </ul>
      </Left>
      <Right>
        {latest.map(blog => (
          <div key={blog.content._uid}>
            <h2>{blog.content.title}</h2>
            <h3>{formatDate(blog.published_at)}</h3>
            <div>{blog.content.short || blog.content.body}</div>
            <ContinueReading>
              <Link to={`/blog/${blog.slug}`}>Continue reading</Link>
              <span className="fa fa-angle-right" />
            </ContinueReading>
          </div>
        ))}
      </Right>
    </Container>
  );
};

Blog.propTypes = {
  Storyblok: PropTypes.object
};

export default context.withConsumer(Blog);
