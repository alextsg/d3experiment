d3experiment
============

Experimenting with D3

This an exercise in creating a chart/graph using the Data-Driven Documents (D3) library. I used the Kimono extension to turn Stephen Curry's 2014-15 Game Log page on basketball-reference.com into an API. Kimono grabs information from the page daily, and this page uses an AJAX call to access that data.

The purpose of the page is to display Stephen Curry's statistical performance and his influence on the game outcome more easily. Users are able to see, for example, whether the number of points he scores or the number of rebounds he grabs is a bigger factor in the team's wins or losses.

The size of the circles corresponds to Curry's GameScore for that game. GameScore is a measurement created by John Hollinger that combines every statistic a player achieved over the course of a game in a weighted formula that serves to quantify a player's performance for that game. The larger the circle, the higher the GameScore.