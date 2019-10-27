import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import context from "../../App.context";
import { formatDate, useWithHiglight } from "./utils";
import { Content } from "./Blog.styles";
import qs from "query-string";
import Markdown from "react-markdown";

let unmounted = false;

const usefetchEntry = ({ Storyblok, request, setEntry, slug }) => () => {
  unmounted = false;

  const query =
    typeof window !== "undefined"
      ? qs.parse(window.location.search)
      : request.query;

  Storyblok.get("cdn/stories/blog/" + slug, {
    version: (query || {})._storyblok_c === "blog-entry" ? "draft" : "published"
  }).then(response => {
    if (unmounted === false) {
      setEntry(response.data.story);
    }
  });

  return () => {
    unmounted = true;
  };
};

const SingleView = ({ Storyblok, request, match }) => {
  const [entry, setEntry] = useState({});
  const fetchEntry = usefetchEntry({
    Storyblok,
    request,
    setEntry,
    slug: match.params.title
  });

  useEffect(fetchEntry, []);
  useWithHiglight(entry);

  if (!entry || !entry.content) {
    return "";
  }

  return (
    <div key={entry.content._uid}>
      <h2>{entry.content.title}</h2>
      <h3>{formatDate(entry.published_at)}</h3>
      <Content>
        <Markdown source={entry.content.body} />
      </Content>
    </div>
  );
};

SingleView.propTypes = {
  Storyblok: PropTypes.object,
  request: PropTypes.object,
  match: PropTypes.object
};

export default context.withConsumer(SingleView);
