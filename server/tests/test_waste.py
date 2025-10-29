import pytest
from models import WasteLog
from datetime import datetime

class TestWasteRoutes:
    """Test waste log endpoints"""
    
    def test_create_waste_log_success(self, client, sample_user, auth_headers, db):
        """Test creating a waste log entry"""
        response = client.post('/api/waste-logs/', 
            headers=auth_headers,
            json={
                'waste_type': 'plastic',
                'weight': 5.5,
                'co2_saved': 2.75,
                'disposal_method': 'recycling',
                'collection_location': 'Nairobi',
                'collection_status': 'pending'
            }
        )
        
        assert response.status_code == 201
        data = response.get_json()
        assert data['message'] == 'Waste log created successfully'
        assert data['data']['waste_type'] == 'plastic'
        assert data['data']['weight'] == 5.5
        assert data['data']['co2_saved'] == 2.75
    
    def test_create_waste_log_missing_fields(self, client, auth_headers):
        """Test creating waste log with missing required fields"""
        response = client.post('/api/waste-logs/', 
            headers=auth_headers,
            json={
                'waste_type': 'plastic'
                # Missing weight
            }
        )
        
        assert response.status_code == 400
        data = response.get_json()
        assert 'Waste type and weight are required' in data['message']
    
    def test_create_waste_log_no_auth(self, client):
        """Test creating waste log without authentication"""
        response = client.post('/api/waste-logs/', json={
            'waste_type': 'plastic',
            'weight': 5.5
        })
        
        assert response.status_code == 401
    
    def test_get_user_waste_logs(self, client, sample_user, auth_headers, db):
        """Test getting user's waste logs"""
        # Create test waste logs
        log1 = WasteLog(
            id='log-1',
            user_id=sample_user.id,
            waste_type='plastic',
            weight=3.0,
            co2_saved=1.5
        )
        log2 = WasteLog(
            id='log-2',
            user_id=sample_user.id,
            waste_type='paper',
            weight=2.0,
            co2_saved=1.0
        )
        db.session.add_all([log1, log2])
        db.session.commit()
        
        response = client.get('/api/waste-logs/', headers=auth_headers)
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['message'] == 'Waste logs fetched successfully'
        assert len(data['data']) == 2
        assert data['data'][0]['waste_type'] in ['plastic', 'paper']
    
    def test_get_all_waste_logs(self, client, sample_user, db):
        """Test getting all waste logs (admin endpoint)"""
        # Create test waste logs
        log = WasteLog(
            id='log-admin-1',
            user_id=sample_user.id,
            waste_type='organic',
            weight=4.0,
            co2_saved=2.0
        )
        db.session.add(log)
        db.session.commit()
        
        response = client.get('/api/waste-logs/all')
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['message'] == 'All waste logs fetched successfully'
        assert isinstance(data['data'], list)
    
    def test_update_waste_log_status(self, client, sample_user, db):
        """Test updating waste log collection status"""
        # Create test waste log
        log = WasteLog(
            id='log-update-1',
            user_id=sample_user.id,
            waste_type='metal',
            weight=1.5,
            collection_status='pending'
        )
        db.session.add(log)
        db.session.commit()
        
        response = client.put(f'/api/waste-logs/{log.id}/status', json={
            'collection_status': 'collected'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['message'] == 'Waste log status updated successfully'
        assert data['data']['collection_status'] == 'collected'
    
    def test_update_nonexistent_waste_log(self, client):
        """Test updating non-existent waste log"""
        response = client.put('/api/waste-logs/nonexistent-id/status', json={
            'collection_status': 'collected'
        })
        
        assert response.status_code == 404
        data = response.get_json()
        assert 'Waste log not found' in data['message']
    
    def test_delete_waste_log(self, client, sample_user, db):
        """Test deleting a waste log"""
        # Create test waste log
        log = WasteLog(
            id='log-delete-1',
            user_id=sample_user.id,
            waste_type='glass',
            weight=2.5
        )
        db.session.add(log)
        db.session.commit()
        
        response = client.delete(f'/api/waste-logs/{log.id}')
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['message'] == 'Waste log deleted successfully'
        
        # Verify deletion
        deleted_log = WasteLog.query.get(log.id)
        assert deleted_log is None
    
    def test_delete_nonexistent_waste_log(self, client):
        """Test deleting non-existent waste log"""
        response = client.delete('/api/waste-logs/nonexistent-id')
        
        assert response.status_code == 404
        data = response.get_json()
        assert 'Waste log not found' in data['message']
