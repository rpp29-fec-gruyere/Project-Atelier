# Project-Atelier

![Visual overview of Project Atelier](/readme_assets/page-overview.gif?raw=true)

Project Atelier is a scalable single-page web-application built by [Layla Grace](www.linkedin.com/in/thegraceoflayla), [Sung Jae Yoo](https://www.linkedin.com/in/sungu93/), and [Ryan Lott](https://www.linkedin.com/in/ryan-c-lott/) for the purpose of displaying clothing products. The page consists of three main sections (outlined below) that collectively allow the user to peruse, compare, select, and reviews products.

#### Tech Stack
The front end of Project Atelier primarily uses a combination of React 17 and bespoke CSS. It is served by a Node-based Express server that relies on an external database to populate the product page and uses a combination of Webpack, Babel, Brotli, and Gzip for transpilation and packaging,

#### Performance Overview
Below you can see the exceptional results of a desktop Lighthouse audit performed on an AWS EC2 instance of Project Atelier. The same instance tested with Google Pagespeed recieved a 95 for mobile performance and a 99 for desktop performance.

![Lighthouse Results: Performance 99, Accessibility: 100, Best Practices: 93, SEO: 90, First Contentful Paint: 0.4 seconds, Speed Index: 0.4 seconds, Largest Contentful Paint: 0.9 seconds, Time to Interactive: 0.4 seconds, Total Blocking Time: 0ms, Cumulative Layout Shift: 0](/readme_assets/lighthouse-audit.png?raw=true)

## Individual Sections
While the backend structure of Project Atelier and its server were a collaborative effort, the three main sections of the front-end (outlined below) were each created individually.

#### Section I - Product Overview
The Product Overview, created by [Layla Grace](www.linkedin.com/in/thegraceoflayla), features an expandable and zoomable photo carousel and allows the users to select the style, size, and quantity of the desired product. It also provides key information such as the product description, features, and rating (which links to the Ratings & Reviews section).

![The product overview carousel and style selection](/readme_assets/product-display.gif?raw=true)

![The add to cart process](/readme_assets/product-selection.gif?raw=true)

#### Section II - Additional Products
The Additional Products section, created by [Sung Jae Yoo](https://www.linkedin.com/in/sungu93/), retrieves the relevant data for products that the user might also be interested in and displays the products in a carousel. The items in this carousel can be used to navigate to other products and compare the features between two products. It also includes an "Outfit" section that allows users to group items that they think would work well together.

![Additional Products and Your Outfit demo](/readme_assets/additional-products.gif?raw=true)

![Product comparison demo](/readme_assets/product-comparison.gif?raw=true)

#### Section III - Ratings & Reviews
The Ratings & Reviews section, created by [Ryan Lott](https://www.linkedin.com/in/ryan-c-lott/), allows the user to read other users' reviews (sorted by relevance, helpfulness, or date), see the photos they've uploaded of their purchases, filter reviews by rating, and mark certain reviews as helpful. It also provides a meta analysis of the reviews which includes a breakdown of the individual characteristics that the product was scored on.

![Ratings & Reviews overview](/readme_assets/read-reviews.gif?raw=true)

![Add a review feature overview](/readme_assets/write-review.gif?raw=true)

## Development Git Workflow ##
To contribute to Project Atelier, follow the instructions below.
> 1. Clone the repo to your local machine.
> 2. Create a branch off of `main` for the new feature to be added.
> 3. Whenever a new merge is made on the remote `main` branch, switch to your local `main` branch and pull down from the remote. Then switch back to your feature branch and merge with your now-updated local `main`.
> 4. When your feature is complete, ensure that there's nothing being flagged by the linter. Then make your final commit.
> 5. Push your commit to the (potentially-new) corresponding feature branch on the remote.
> 6. Create a pull request to merge your feature branch into `main`, then request reviews from each of your team members. Notify the Slack channel of your pull request. Once two team members have approved the pull request, the merge can be made.
