---
title: Alternative UMIP Github Walkthrough
sidebar_label: UMIP Github Submission Tutorial
---

This tutorial describes how to submit an UMIP pull request on Github.
Here's the quickest workflow for how you can add a PR. This method is recommended if you are having issues with github desktop.

# Creating a fork:

1. Go the the UMAprotocol/UMIPs repo: https://github.com/UMAprotocol/UMIPs

2. Click the Fork button

![Create](/docs/GitHub-walkthrough/creating-a-fork.png)

Once that is done, you should have a fork in your own github profile. Here's an example.

![Created](/docs/GitHub-walkthrough/Fork-Created.png)

Next, you'll want to **Create a new branch**

Each pr that you should submit should be siloed to an individual branch. So if you want to submit three separate umips, you should create three separate branches for each.

Click on the button that says **master**

![Master](/docs/GitHub-walkthrough/Create-a-branch.png)

and type in a new **branch name**

![Branchname](/docs/GitHub-walkthrough/branch-name.png)

And click the **Create branch: branchname button**
This should now switch to your branch name, which indicates that you are on your new branch:

![Branchcreated](/docs/GitHub-walkthrough/your-own-branch-name.png)

Next you'll: **Add a file**

Click on this **Add file button**

![Addfile](/docs/GitHub-walkthrough/add-a-new-file.png)

And click **Create new file**

This will open up a blank file that looks like this:

![Blankfile](/docs/GitHub-walkthrough/blank-file.png)

In that file, copy and paste in the discourse content

And name your file something like: **add-xyz-priceid.md**

It is important to end it with a **.md** to designate that it is a markdown file

Scroll down and click **commit new file**

![Commitnewfile](/docs/GitHub-walkthrough/commit-new-file.png)

You should now get a notif at the top of your repo page that looks like this:

![Compare](/docs/GitHub-walkthrough/compare-and-pull-request.png)

Click **Compare & pull request**

Which will open up a screen that looks like this:

![Openpr](/docs/GitHub-walkthrough/Open-a-pull-request.png)

Make sure that the **base repository** is selected to *UMAprotocol/UMIPs

Adjust your title to match the title of your UMIP

And then click the **Create pull request* button:**

![Prcreated](/docs/GitHub-walkthrough/pull-request-created.png)

Boom - you're done. No CL or github desktop needed














