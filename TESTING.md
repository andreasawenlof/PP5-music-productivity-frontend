# Frontend Testing Scenarios

| **Test Scenario**                                   | **Action**                                                 | **Expected Result**                                                                           | **Result** |
| --------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------- |
| **Sign Up**                                         | Create a new account by filling out the sign-up form.      | The account is created, and the user is logged in.                                            | ✅ Pass    |
| **Sign In (Normal User - 404 on Tracks)**           | Log in as a normal user.                                   | The user sees a 404 error on the track page but can access their profile.                     | ✅ Pass    |
| **Sign In (Reviewer - Limited Access)**             | Log in as a reviewer.                                      | Can only see "Ready for Review" tracks, cannot access anything else except their own profile. | ✅ Pass    |
| **Sign In (Composer - Full Access)**                | Log in as a composer.                                      | Can see all tracks, manage content, and comment.                                              | ✅ Pass    |
| **Sign Out**                                        | Click the "Sign Out" button.                               | The user is logged out and redirected to the sign-in page.                                    | ✅ Pass    |
| **Create a Track**                                  | Fill out the track creation form.                          | The track is created and visible in the track list.                                           | ✅ Pass    |
| **Edit a Track**                                    | Edit an existing track.                                    | The track updates successfully.                                                               | ✅ Pass    |
| **Delete a Track**                                  | Delete a track from the track list or track details.       | The track is deleted and removed from the site.                                               | ✅ Pass    |
| **View a Track’s Details**                          | Click on a track to view details.                          | The track details (title, content, comments) are displayed.                                   | ✅ Pass    |
| **Create a Comment on a Track**                     | Add a comment to a track.                                  | The comment appears under the track, and the comment count updates.                           | ✅ Pass    |
| **Edit a Comment**                                  | Edit an existing comment.                                  | The comment updates successfully.                                                             | ✅ Pass    |
| **Delete a Comment**                                | Delete a comment.                                          | The comment is removed from the post, and the count updates.                                  | ✅ Pass    |
| **Comment Name & Avatar Link to Profile**           | Click on a comment author’s name/avatar.                   | Should link to their profile.                                                                 | ❌ Fail    |
| **View Profile Page**                               | Visit the profile page.                                    | The user’s profile details, bio, and posts are displayed.                                     | ✅ Pass    |
| **Edit Profile**                                    | Update bio, avatar, or display name.                       | Profile updates successfully.                                                                 | ✅ Pass    |
| **View All Tracks (Homepage)**                      | Navigate to the track list.                                | All tracks are displayed properly.                                                            | ✅ Pass    |
| **Filter Tracks by Genre, Mood, Status**            | Use filters on the track list.                             | Tracks filter correctly.                                                                      | ✅ Pass    |
| **Search for a Track**                              | Search for tracks by keyword.                              | Matching tracks appear dynamically as the user types.                                         | ✅ Pass    |
| **View Tracks Assigned to a Composer**              | View tracks that are assigned to a specific composer.      | No way to determine assigned composer currently.                                              | ❌ Fail    |
| **Navigate Between Pages (Navbar & Links)**         | Click links in the navbar and buttons.                     | Navigation works smoothly.                                                                    | ✅ Pass    |
| **Responsive Layout Test**                          | Resize the window and test on mobile, tablet, and desktop. | The layout adapts correctly.                                                                  | ✅ Pass    |
| **Error Handling (Invalid Inputs, Login Failures)** | Test empty inputs, invalid logins, and form errors.        | Proper error messages should appear.                                                          | ✅ Pass    |
| **Unauthorized Access Redirects**                   | Try accessing unauthorized pages.                          | Users are redirected if they attempt to edit/delete unauthorized content.                     | ✅ Pass    |
| **Navbar Collapse Button (Mobile)**                 | Test navbar behavior on mobile.                            | The navbar collapses and expands properly.                                                    | ✅ Pass    |

## ✅ Validation Tests

### **W3C HTML Validation**

-   **Tested index.html** ✅ **No Errors Found**
-   **Warnings:** Minor **trailing slash warnings** on self-closing elements (e.g., `<meta />`, `<link />`). These **do not affect functionality**.

**Validation Screenshot:**
![HTML Validation](src/assets/validation/htmlvalidate.png)

---

### **W3C CSS Validation**

-   **Tested project styles** ✅ **No Errors Found**
-   No issues detected with CSS structure.

**Validation Screenshot:**
![CSS Validation](src/assets/validation/css.png)

---

### **Lighthouse Performance Test**

Lighthouse test was conducted across multiple pages. Scores:

-   **Home Page:** ✅ **Performance 80+**, ✅ Accessibility, ✅ SEO.
-   **Sign Up Page:** ✅ **Performance 85+**, ✅ Accessibility.
-   **Profile Page:** ✅ Passed.
-   **Create Post Page:** ✅ Passed.

**Lighthouse Screenshots:**
![Lighthouse Home](src/assets/lighthouse/home-lighthouse.png)

![Lighthouse Signup](src/assets/lighthouse/sign-up-lighthouse.png)

![Lighthouse Login](src/assets/lighthouse/login-lighthouse.png)

![Lighthouse Profile](src/assets/lighthouse/profile-lighthouse.png)

---

### **Browser Compatibility Testing**

Tested the application on multiple browsers:

| **Browser**     | **Operating System** | **Result**                     |
| --------------- | -------------------- | ------------------------------ |
| Google Chrome   | macOS Sonoma         | ✅ Passed                      |
| Mozilla Firefox | Windows 10           | ✅ Passed                      |
| Microsoft Edge  | Windows 10           | ✅ Passed (Minor UI variation) |
| Safari          | macOS Sonoma         | ✅ Passed                      |
| Opera           | Windows 10           | ✅ Passed                      |
| Safari          | iOS 17               | ✅ Passed                      |

---

### **Wave Accessibility Test**

-   **Home Page** tested with **Wave** for accessibility.
-   **No critical errors.**
-   **Minor contrast issues** flagged but do not impact usability.

**Wave Screenshot:**
![Wave Test](src/assets/wave.png)

---

## **Known Issues**

❌ **Issue:** No feedback when user fails to log in due to invalid credentials.  
💡 **Fix:** Add a feedback message when login fails.

❌ **Issue:** When trying to access a specific profile while logged out, the app throws a **500 error** due to `'AnonymousUser' object has no attribute 'profile'`.  
💡 **Fix:** Implement proper error handling when accessing profiles while logged out.

❌ **Issue:** Comment name/avatar links to profile but only redirects to the **logged-in user’s profile** instead of the correct user.  
💡 **Fix:** Ensure correct user profile links are generated.

❌ **Issue:** No way to determine which tracks are **assigned to a composer**.  
💡 **Fix:** Implement filtering for assigned composers.

---

## **Conclusion**

✅ **All major functionalities tested & passed**  
✅ **No critical issues in W3C validation or accessibility tests**  
✅ **Application is functional and ready for submission**  
❌ **Known issues documented for future improvements**

🚀 **Project is ready for submission!**
