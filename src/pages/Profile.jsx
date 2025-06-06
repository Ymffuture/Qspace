import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import { IoCameraOutline } from "react-icons/io5"

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"

import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { setUser } from '@/redux/user/user.slice'
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'

const Profile = () => {
  const [filePreview, setPreview] = useState()
  const [file, setFile] = useState()
  const user = useSelector((state) => state.user)

  const { data: userData, loading } = useFetch(`${getEvn('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
    { method: 'get', credentials: 'include' })

  const dispatch = useDispatch()

  const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters.'),
    email: z.string().email(),
    bio: z.string().min(3, 'Bio must be at least 3 characters.'),
    password: z.string().optional()
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      password: ''
    },
  })

  useEffect(() => {
    if (userData?.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio
      })
    }
  }, [userData])

  const onSubmit = async (values) => {
    try {
      const formData = new FormData()
      if (file) formData.append('file', file)
      formData.append('data', JSON.stringify(values))

      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
        method: 'put',
        credentials: 'include',
        body: formData
      })

      const data = await response.json()
      if (!response.ok) return showToast('error', data.message)

      dispatch(setUser(data.user))
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  const handleFileSelection = (files) => {
    const selected = files[0]
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  if (loading) return <Loading />

  return (
    <Card className="max-w-3xl mx-auto mt-12 shadow-xl backdrop-blur-lg bg-white/40 dark:bg-[#1a1a1a]/50 border border-white/20 rounded-2xl transition-all duration-500">
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center">
          <Dropzone onDrop={accepted => handleFileSelection(accepted)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="relative cursor-pointer group">
                <input {...getInputProps()} />
                <Avatar className="w-32 h-32 border-4 border-white/60 shadow-md transition-all duration-300 group-hover:scale-105">
                  <AvatarImage
                    className="rounded-full object-cover"
                    src={filePreview || userData?.user?.avatar}
                    alt="Profile"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-full hidden group-hover:flex items-center justify-center transition-all">
                    <IoCameraOutline className="text-white text-2xl" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>

          <h2 className="mt-4 text-xl font-bold text-center text-blue-800 dark:text-blue-400">{userData?.user?.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{userData?.user?.email}</p>
        </div>

        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" className="input-style" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" className="input-style" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Tell us about yourself..." className="resize-none min-h-[80px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Enter new password (optional)" className="input-style" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold tracking-wide rounded-md shadow-lg transition-all duration-300">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

export default Profile

