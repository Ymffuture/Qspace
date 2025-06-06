import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice'

const Profile = () => {
    const [filePreview, setPreview] = useState()
    const [file, setFile] = useState()
    const user = useSelector((state) => state.user)

    const { data: userData, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
        { method: 'get', credentials: 'include' },
    )

    const dispath = useDispatch()

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 character long.'),
        email: z.string().email(),
        bio: z.string().min(3, 'Bio must be at least 3 character long.'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            bio: '',
            password: '',
        },
    })

    useEffect(() => {
        if (userData && userData.success) {
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio,
            })
        }
    }, [userData])

    async function onSubmit(values) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify(values))

            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            })

            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispath(setUser(data.user))
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }

    if (loading) return <Loading />

    return (
        <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-xl mt-10 border border-gray-300">
  <CardContent className="p-6">
    <div className="flex flex-col items-center gap-4 mb-6 relative">
      <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="relative cursor-pointer group">
            <input {...getInputProps()} />
            <Avatar className="w-32 h-32 shadow-lg ring-4 ring-white relative group">
              <AvatarImage
                src={filePreview || userData?.user?.avatar}
                className="rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-black/40 hidden group-hover:flex items-center justify-center transition-all duration-200">
                <IoCameraOutline size={30} color="#FFF" />
              </div>
            </Avatar>
          </div>
        )}
      </Dropzone>
      <h2 className="text-xl font-semibold text-white">{form.getValues("name") || "Your Name"}</h2>
      <p className="text-sm text-gray-200 text-center">{form.getValues("bio") || "Add a short bio"}</p>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input className="bg-white/20 text-white placeholder:text-white/70 rounded-xl" {...field} />
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
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input className="bg-white/20 text-white placeholder:text-white/70 rounded-xl" {...field} />
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
              <FormLabel className="text-white">Bio</FormLabel>
              <FormControl>
                <Textarea className="bg-white/20 text-white placeholder:text-white/70 rounded-xl" {...field} />
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
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="bg-white/20 text-white placeholder:text-white/70 rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-2 mt-2 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-300 hover:brightness-110 text-black font-bold rounded-full transition-all shadow-md"
        >
          Save Profile
        </Button>
      </form>
    </Form>
  </CardContent>
</Card>

    )
}

export default Profile

