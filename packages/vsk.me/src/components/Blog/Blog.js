import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import { Route, Switch } from "react-router-dom";
import context from "../../App.context";
import * as styles from "./Blog.styles.js";
import { Link } from "react-router-dom";
import { formatDate, useWithHiglight } from "./utils";
import qs from "query-string";
import SingleView from "./SingleView";

const { Container, Left, Right, ContinueReading, Content } = styles;

let unmounted = false;

const useFetchEntries = ({ Storyblok, request, setLatest }) => () => {
  unmounted = false;

  const query =
    typeof window !== "undefined"
      ? qs.parse(window.location.search)
      : request.query;

  Storyblok.get("cdn/stories", {
    starts_with: "blog/",
    version: (query || {})._storyblok_c === "blog-entry" ? "draft" : "published"
  }).then(response => {
    if (unmounted === false) {
      setLatest(response.data.stories);
    }
  });

  return () => {
    unmounted = true;
  };
};

const Blog = ({ Storyblok, request }) => {
  const [latest, setLatest] = useState([]);
  const fetchEntries = useFetchEntries({ Storyblok, request, setLatest });
  useEffect(fetchEntries, []);
  useWithHiglight();

  return (
    <Container>
      <Left>
        <h3>Latest entries</h3>
        <ul>
          {latest.map(blog => (
            <li key={blog.content._uid}>
              <span className="fa fa-angle-right" />
              <Link to={`/${blog.full_slug}`}>{blog.content.title}</Link>
            </li>
          ))}
        </ul>
      </Left>
      <Right>
        <Switch>
          <Route
            path="/blog"
            children={() =>
              latest.map(blog => (
                <div key={blog.content._uid}>
                  <h2>{blog.content.title}</h2>
                  <h3>{formatDate(blog.published_at)}</h3>
                  <Content>
                    <Markdown
                      source={blog.content.short || blog.content.body}
                    />
                  </Content>
                  <ContinueReading>
                    <Link to={`/${blog.full_slug}`}>Continue reading</Link>
                    <span className="fa fa-angle-right" />
                  </ContinueReading>
                </div>
              ))
            }
            exact
          />
          <Route path="/blog/:title" component={SingleView} />
        </Switch>
      </Right>
    </Container>
  );
};

Blog.propTypes = {
  Storyblok: PropTypes.object,
  request: PropTypes.object
};

export default context.withConsumer(Blog);
