import React, { useEffect } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'   // ← fixed import name

// schema must be defined before you use it
const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long.')
})

const AddCategory = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: ''
    }
  })

  const categoryName = form.watch('name')

  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true })
      form.setValue('slug', slug, { shouldValidate: true })
    }
  }, [categoryName, form])

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEvn('VITE_API_BASE_URL')}/category/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
      )
console.log(getEvn('VITE_API_BASE_URL'))
      const data = await response.json()

      if (!response.ok) {
        return showToast('error', data.message)
      }

      form.reset()
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div>
      <Card className="pt-5 max-w-screen-md mx-auto">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Auto-generated slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-black">
                Add
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCategory
