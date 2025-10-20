'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import wasteService from '@/services/wasteService';
import { TrendingUp, Recycle, Award, Leaf } from 'lucide-react';

