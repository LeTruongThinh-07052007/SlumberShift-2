import React from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";

const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("MẬT KHẨU MỚI KHÔNG KHỚP");
            return;
        }
        try {
            const res = await changeUserPassword(data).unwrap();
            toast.success("ĐÃ THAY ĐỔI MẬT KHẨU THÀNH CÔNG");
            
            setTimeout(() => setOpen(false), 1500);
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || err.error );
        }
    };

    return (
        
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)} className="">
                <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                    ĐỔI MẬT KHẨU
                </Dialog.Title>
                <Textbox
                    placeholder="Mật khẩu mới"
                    type="password"
                    name="password"
                    label="Mật khẩu mới"
                    className="w-full rounded"
                    register={register("password", {
                        required: "Hãy nhập mật khẩu mới",
                    })}
                    error={errors.password ? errors.password.message : ""}
                />
                <Textbox
                    placeholder="Xác nhận mật khẩu mới"
                    type="password"
                    name="cpass"
                    label="Xác nhận mật khẩu mới"
                    className="w-full rounded"
                    register={register("cpass", {
                        required: "Hãy xác nhận mật khẩu mới!",
                    })}
                    error={errors.cpass ? errors.cpass.message : ""}
                />
                {isLoading ? (
                    <div className="py-5">
                        <Loading />
                    </div>
                ) : (
                    <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                        <Button
                            type="submit"
                            className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 w-full sm:w-auto"
                            label="Lưu"
                        />
                        <button
                            type="button"
                            className="mt-3 sm:mt-0 bg-white px-5 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 w-full sm:w-auto"
                            onClick={() => setOpen(false)}
                        >
                           Thoát
                        </button>
                    </div>
                )}
            </form>
        </ModalWrapper>
    );
};

export default ChangePassword;