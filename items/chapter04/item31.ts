/**
 * Item31: Push null values to the perimeter of your types
 *
 * Things to remember
 * - avoid design in which one value being null or non-null is implicitly related to another value being null or non-null
 *
 * - push null values to the perimeter of your API by making lager objects either null or fully non-null
 * - this will make code clearer both for human readers and for type checker
 *
 * - consider creating a fully non-null class and constructing it when all values are available
 *
 * - while strictNullChecks may flag many issues in your code, it's indispensable for surfacing the behavior of functions with respect to null values
 */

// strictNullCheck
function extent(nums: number[]) {
  let min, max;
  for (const num of nums) {
    if (!min) {
      min = num;
      max = num;
    } else {
      min = Math.min(min, num);
      max = Math.max(max, num); // type is number | undefined
    }
  }
  return [min, max];
}
const [min, max] = extent([0, 1, 2]);
const span = max - min; // possibly undefined

// better solution
function extent2(nums: number[]) {
  let result: [number, number] | null = null;
  for (const num of nums) {
    if (!result) {
      result = [num, num];
    } else {
      result = [Math.min(num, result[0]), Math.max(num, result[1])];
    }
  }
  return result;
}
const range = extent2([0, 1, 2]);
if (range) {
  const [min, max] = range;
  const span = max - min;
}

// bad example
class UserPosts {
  user: UserInfo | null;
  posts: Post[] | null;
  constructor() {
    this.user = null;
    this.posts = null;
  }
  async init(userId: string) {
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId)),
    ]);
  }
  getUserName() {
    // ...?
  }
}
const userPosts = new UserPosts();
userPosts.init('userId');

// better solution
class UserPosts2 {
  user: UserInfo;
  posts: Post[];

  constructor(user: UserInfo, posts: Post[]) {
    this.user = user;
    this.posts = posts;
  }

  // static factory method
  static async init(userId: string): Promise<UserPosts> {
    const [user, posts] = await Promise.all([
      fetchUser(userId),
      fetchPostsForUser(userId),
    ]);
    return new UserPosts(user, posts);
  }

  getUserName() {
    return this.user.name;
  }
}
const userPosts2 = UserPosts2.init('userId');
