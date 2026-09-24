"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Users,
  Sliders,
  LogOut,
  ChevronDown
} from "lucide-react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passportNo?: string;
  avatar: string;
  role: "admin" | "user";
  accountType?: "personal" | "corporate" | "family" | "admin";
  walletBalanceThb?: number;
  preferences?: {
    language: "th" | "en" | "ja";
    primaryCurrency: "THB" | "AUD" | "USD" | "EUR" | "JPY";
    notifyDeals?: boolean;
    notifyUpdates?: boolean;
    notifyRates?: boolean;
  };
}

interface ProfileDropdownProps {
  currentUser: UserProfile;
  availableAccounts?: UserProfile[];
  onOpenProfile?: () => void;
  onOpenPreferences?: () => void;
  onOpenSwitchAccount?: () => void;
  onSwitchAccount?: (account: UserProfile) => void;
  onLogout?: () => Promise<void> | void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  currentUser,
  availableAccounts = [],
  onOpenProfile,
  onOpenPreferences,
  onOpenSwitchAccount,
  onSwitchAccount,
  onLogout,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAdmin = currentUser.role === "admin";

  const handleLogoutClick = () => {
    setIsOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    setShowLogoutConfirm(false);
    if (onLogout) {
      await onLogout();
    } else {
      localStorage.removeItem("auth_token");
      sessionStorage.clear();
      router.push("/login");
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer group"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-sky-100 group-hover:ring-sky-300 transition">
          <Image
            src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
            alt={currentUser.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden lg:flex flex-col text-left min-w-0 max-w-[120px]">
          <span className="text-xs font-black text-slate-800 truncate leading-tight">
            {currentUser.name}
          </span>
          <span className="text-[10px] text-slate-400 font-medium truncate leading-tight">
            {isAdmin ? "Admin 🛡️" : "สมาชิกทั่วไป"}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-sky-600" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Box */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-72 rounded-3xl bg-white shadow-2xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Header Profile Summary */}
          <div
            onClick={() => {
              setIsOpen(false);
              onOpenProfile?.();
            }}
            className="px-4 py-3 mx-2 rounded-2xl bg-slate-50 hover:bg-sky-50/70 border border-slate-100 flex items-center gap-3 cursor-pointer transition"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-sky-200 flex-shrink-0">
              <Image
                src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={currentUser.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs text-slate-900 truncate">
                  {currentUser.name}
                </span>
                {isAdmin && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-rose-100 text-rose-700">
                    Admin
                  </span>
                )}
              </div>
              <span className="block text-[11px] text-slate-500 truncate mt-0.5">
                {currentUser.email}
              </span>
            </div>
          </div>

          <div className="py-2 px-2 space-y-0.5">
            {/* 1. ข้อมูลโปรไฟล์ของฉัน */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenProfile ? onOpenProfile() : router.push("/profile");
              }}
              className="w-full px-3 py-2 rounded-2xl hover:bg-sky-50 flex items-center gap-3 text-slate-700 hover:text-sky-600 transition group cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:scale-105 transition flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block font-bold text-xs text-slate-900 group-hover:text-sky-600">
                  ข้อมูลโปรไฟล์ของฉัน
                </span>
                <span className="block text-[10px] text-slate-400">
                  แก้ไขรูปภาพ ชื่อ อีเมล เบอร์โทร
                </span>
              </div>
            </button>

            {/* 2. สลับบัญชี (Switch Account) */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenSwitchAccount ? onOpenSwitchAccount() : router.push("/accounts");
              }}
              className="w-full px-3 py-2 rounded-2xl hover:bg-indigo-50 flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition group cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block font-bold text-xs text-slate-900 group-hover:text-indigo-600">
                  สลับบัญชี (Switch Account)
                </span>
                <span className="block text-[10px] text-slate-400">
                  บัญชีส่วนตัว, องค์กร, ครอบครัว
                </span>
              </div>
            </button>

            {/* 3. การตั้งค่าระบบ (Preferences) */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenPreferences ? onOpenPreferences() : router.push("/preferences");
              }}
              className="w-full px-3 py-2 rounded-2xl hover:bg-amber-50 flex items-center gap-3 text-slate-700 hover:text-amber-600 transition group cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-105 transition flex-shrink-0">
                <Sliders className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block font-bold text-xs text-slate-900 group-hover:text-amber-600">
                  การตั้งค่าระบบ (Preferences)
                </span>
                <span className="block text-[10px] text-slate-400">
                  เปลี่ยนภาษา, AUD/THB/USD, การแจ้งเตือน
                </span>
              </div>
            </button>
          </div>

          {/* 4. ออกจากระบบ (Sign Out) */}
          <div className="pt-2 border-t border-slate-100 px-3">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogoutClick}
              className="w-full px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      )}


      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                ยืนยันการออกจากระบบ?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                เซสชันการเข้าสู่ระบบและโทเค็นจะถูกล้างออกจากเครื่องนี้ คุณสามารถเข้าสู่ระบบใหม่ได้ตลอดเวลา
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition cursor-pointer"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

