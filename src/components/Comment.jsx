<div className="w-full max-w-2xl mx-auto mt-10 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
  <h4 className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-white mb-6">
    <FaComments className="text-blue-600 dark:text-blue-400" />
    Comments
  </h4>

  {user && user.isLoggedIn ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
  <img src={user.user.avatar || '/avatar.png'} className="h-9 w-9 rounded-full border border-gray-300 dark:border-gray-600" />
  <div>
    <p className="text-sm font-medium text-gray-800 dark:text-white">{user.user.name}</p>
    <p className="text-xs text-muted-foreground">{user.user.email}</p>
  </div>
</div>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (    

            <FormItem>
              <FormLabel className="text-gray-600 dark:text-gray-300 font-medium">Leave a comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your thoughts here..."
                  className="min-h-[120px] resize-none rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition rounded-md shadow-sm">
          Submit Comment
        </Button>
      </form>
    </Form>
  ) : (
    <div className="mt-4">
      <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 font-medium rounded-md shadow hover:opacity-90 transition">
        <Link to={RouteSignIn}>Sign In to Comment</Link>
      </Button>
    </div>
  )}

  <div className="mt-8">
    <CommentList props={{ blogid: props.blogid, newComment }} />
  </div>
</div>

