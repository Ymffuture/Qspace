import React, { useState } from 'react';
import { FaComments } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from '@/helpers/showToast';
import { getEvn } from '@/helpers/getEnv';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useSelector } from 'react-redux';
import { RouteSignIn } from '@/helpers/RouteName';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';

const Comment = ({ props }) => {
  const [newComment, setNewComment] = useState();
  const user = useSelector((state) => state.user);

  const formSchema = z.object({
    comment: z.string().min(3, 'Comment must be at least 3 characters long.'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  });

  async function onSubmit(values) {
    try {
      const newValues = {
        ...values,
        blogid: props.blogid,
        user: user.user._id,
      };

      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/comment/add`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newValues),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message);
      }

      setNewComment(data.comment);
      form.reset();
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all">
      <h4 className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        <FaComments className="text-blue-600 dark:text-blue-400" />
        Comments
      </h4>

      {user && user.isLoggedIn ? (
        <>
          {/* Optional: Avatar and username preview */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user.user.avatar || '/avatar.png'}
              alt="avatar"
              className="h-9 w-9 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">{user.user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.user.email}</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition rounded-md shadow-sm"
              >
                Submit Comment
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="mt-4">
          <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 font-medium rounded-md shadow hover:opacity-90 transition">
            <Link to={RouteSignIn}>Sign In to Comment</Link>
          </Button>
        </div>
      )}

      <div className="mt-10">
        <CommentList props={{ blogid: props.blogid, newComment }} />
      </div>
    </div>
  );
};

export default Comment;

