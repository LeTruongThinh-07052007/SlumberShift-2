import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, {isLoading}] = useRegisterMutation();
  const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const updatedData = { ...data };
        if (!data.password) {
          delete updatedData.password;
        }
        const result = await updateUser(updatedData).unwrap();
        toast.success("CẬP NHẬT HỒ SƠ THÀNH CÔNG");
        if (userData?._id === user._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        await addNewUser({ ...data, password: data.email }).unwrap();
        toast.success("ĐÃ THÊM THÀNH VIÊN MỚI");
      }
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ? "CẬP NHẬT" : "ADD NEW USER"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Tên thành viên'
              type='text'
              name='name'
              label='Tên thành viên'
              className='w-full rounded'
              register={register("name", {
                required: "Hãy nhập tên của thành viên!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Tiêu đề'
              type='text'
              name='title'
              label='Tiêu đề'
              className='w-full rounded'
              register={register("title", {
                required: "Hãy nhập tiêu đề!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Địa chỉ Email'
              type='email'
              name='email'
              label='Địa chỉ Email'
              className='w-full rounded'
              register={register("email", {
                required: "Hãy nhập địa chỉ Email!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='Vai trò'
              type='text'
              name='role'
              label='Vai trò'
              className='w-full rounded'
              register={register("role", {
                required: "Hãy nhập vai trò của thành viên!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Cập nhật'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Thoát'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;