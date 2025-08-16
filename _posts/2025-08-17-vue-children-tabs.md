---
tags:
  - post
layout: post
title: "Tabbed navigation on a screen in a Vue app"
summary: "How to make tabbed navigation with appropriate sub-paths using vue-router and nested routes"
date: 2025-08-17T03:24:25+0530
categories:
  - "blaugust-2025"
  - "programming"
---

## Problem Statement

In a [Vue](https://vuejs.org) application I needed to have a screen (on path `/department/:departmentId`) where I need to show one common header containing a selector between three tabs and then a body section which would show different content based on which tab was selected. And each tab would be associated with a different sub-path:

- "Overview"  -> `/department/:id`
- "Members" -> `/department/:id/members`
- "Clients" -> `/department/:id/clients`

It also had to be implemented that navigating directly to any of the sub-paths should open the correct page.

## Solution Approach

I needed to use `<router-view />` and the [nested routes](https://router.vuejs.org/guide/essentials/nested-routes.html) feature from [vue-router](https://router.vuejs.org/).

## Configuring the router

Here is how we configured the routes:

```typescript
const routes = [
  {
    path: '/department/:id',
    component: () => import('@/views/department/Index.vue'),
    children: [
      { path: '', name: 'department-overview', component: () => import('@/views/department/TabOverview.vue') },
      { path: 'members', name: 'department-members', component: () => import('@/views/department/TabMembers.vue') },
      { path: 'clients', name: 'department-clients', component: () => import('@/views/department/TabClients.vue') },
    ],
  }
];
```

Notice that we haven't specified any extra `path` for the "Overview" tab. This is by design and will be explained later.

## Setting up the root view

And the contents of `Index.vue` (containing the overall page contents) looked something like this:

```vue
&lt;script setup lang="ts"&gt;&lt;/script&gt;

&lt;template&gt;
  &lt;nav&gt;
    &lt;router-link :to="{ name: 'department-overview' }"&gt;Overview&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'department-members' }"&gt;Members&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'department-clients' }"&gt;Clients&lt;/router-link&gt;
  &lt;/nav&gt;
  &lt;main&gt;
    &lt;router-view /&gt;
  &lt;/main&gt;
&lt;/template&gt;
```

## Individual tab contents

Each tab's file turns out pretty simple, something like this:

```vue
&lt;script setup lang="ts"&gt;&lt;/script&gt;

&lt;template&gt;
  &lt;p&gt;Overview/Members/Clients&lt;/p&gt;
&lt;/template&gt;
```

## Combining the ingredients

The reason we did not specify an extra `path` in our router is that we need to show it directly when `/department/:id` is opened. Now when we go to `/department/:id` we see the header bar showing the three tab links and the contents of the "Overview" tab under it. Clicking on any other tab shows that content below the header bar, also the url gets updated.

This gives us clean URLs, browser history support, the ability to persist tab-selection across page refresh, and the ability to directly navigate to any tab via URL. No manual state management is required to determine what content to show, it will automatically update based on the URL.
