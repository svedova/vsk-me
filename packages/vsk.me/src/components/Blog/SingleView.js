import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import context from "../../App.context";
import { formatDate } from "./utils";
import qs from "query-string";

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
  console.log(match);
  const [entry, setEntry] = useState({});
  const fetchEntry = usefetchEntry({
    Storyblok,
    request,
    setEntry,
    slug: match.params.title
  });

  useEffect(fetchEntry, []);

  if (!entry || !entry.content) {
    return "";
  }

  return (
    <div key={entry.content._uid}>
      <h2>{entry.content.title}</h2>
      <h3>{formatDate(entry.published_at)}</h3>
      <div>{entry.content.body}</div>
    </div>
  );
};

SingleView.propTypes = {
  Storyblok: PropTypes.object,
  request: PropTypes.object,
  match: PropTypes.object
};

export default context.withConsumer(SingleView);
