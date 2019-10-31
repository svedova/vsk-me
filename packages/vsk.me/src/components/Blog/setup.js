/**
 * Setup method for server side rendering.
 */
export const setup = async context => {
  // Fetch latest entries
  try {
    const response = await context.Storyblok.get("cdn/stories", {
      starts_with: "blog/"
    });

    context.state = context.state || {};
    context.state.latest = response.data.stories;
  } catch (e) {
    console.error(e.message);
  }

  // Fetch single entry
  if (context.request.path.indexOf("blog/") !== -1) {
    try {
      const response = await context.Storyblok.get(
        "cdn/stories/blog/" + context.request.path.split("blog/")[1],
        {}
      );

      context.state = context.state || {};
      context.state.entry = response.data.story;
    } catch (e) {
      console.error(e.message);
    }
  }
};
